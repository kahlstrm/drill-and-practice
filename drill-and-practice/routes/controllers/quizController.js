import { getTopics } from "../../services/topicService.js";

const showQuizMain = async ({ render }) => {
  const topics = await getTopics();
  await render("quiz.eta", { topics });
};
const showQuizQuestion = async ({ params, render, response }) => {};
export { showQuizMain };
