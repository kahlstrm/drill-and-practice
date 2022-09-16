import { getTopics } from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
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
const redirectQuiz = async ({ params, response, render }) => {
  const topicId = params.id;
  const id = await quizService.getRandomQuestionId(topicId);
  if (!id) {
    return render("random.eta");
  }
  response.redirect(`/quiz/${topicId}/questions/${id}`);
};
export { showQuizMain, redirectQuiz, showQuizQuestion };
