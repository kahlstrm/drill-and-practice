import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as authController from "./controllers/authController.js";
const router = new Router();

router.get("/", mainController.showMain);

//topics
router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:id", topicController.showTopic);
router.post("/topics/:id/delete", topicController.removeTopic);

//questions
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post("/topics/:id/questions/:qId/options", questionController.addOption);
router.post(
  "/topics/:id/questions/:qId/delete",
  questionController.removeQuestion
);
router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  questionController.removeOption
);

//auth

router.get("/auth/login", authController.showLogin);
router.get("/auth/register", authController.showRegister);
router.post("/auth/register", authController.registerAccount);
router.post("/auth/login", authController.logIn);
router.get("/auth/logout", authController.logOut);
export { router };
