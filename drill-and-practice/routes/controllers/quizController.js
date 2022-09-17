import { getTopics } from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import {
  getOptionById,
  getOptionsById,
} from "../../services/questionService.js";

const showQuizMain = async ({ render }) => {
  const topics = await getTopics();
  await render("quiz.eta", { topics });
};
const showQuizQuestion = async ({ params, response, render }) => {
  const topicId = params.id;
  const questionId = params.qId;
  const question = await quizService.getQuestion(questionId);
  if (question.topicId != topicId) {
    response.status = 400;
    return;
  }
  await render("random.eta", question);
};
const showIsCorrect = ({ params, render }) => {
  const topicId = params.id;
  render("correctpage.eta", { topicId, correct: true });
};
const showIncorrect = async ({ params, render }) => {
  const topicId = params.id;
  const questionId = params.qId;
  const options = await getOptionsById(questionId);
  const correctAnswer = options.find((n) => n.is_correct);
  render("correctpage.eta", { topicId, correctAnswer, correct: false });
};
const redirectQuiz = async ({ params, response, render }) => {
  const topicId = params.id;
  const id = await quizService.getRandomQuestionId(topicId);
  if (!id) {
    return render("random.eta");
  }
  response.redirect(`/quiz/${topicId}/questions/${id}`);
};
const handleAnswer = async ({ params, response, user }) => {
  const topicId = params.id;
  const questionId = params.qId;
  const optionId = params.oId;
  const question = await quizService.getQuestion(questionId);
  let option = question.answerOptions.find((n) => n.optionId == optionId);
  if (question.topicId != topicId || !option) {
    response.status = 400;
    return;
  }
  if (user.email != "guest@guest.com") {
    await quizService.saveAnswer(optionId, questionId, user.id);
  }
  option = await getOptionById(optionId);
  if (option.is_correct) {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
  } else {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
  }
};
export {
  showQuizMain,
  redirectQuiz,
  showQuizQuestion,
  handleAnswer,
  showIsCorrect,
  showIncorrect,
};
