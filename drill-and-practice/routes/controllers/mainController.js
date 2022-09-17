import { getStatistics } from "../../services/quizService.js";
const showMain = async ({ render }) => {
  const stats = await getStatistics();
  console.log(stats);
  await render("main.eta", stats);
};

export { showMain };
