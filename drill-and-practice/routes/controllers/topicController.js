import { validasaur as v } from "../../deps.js";

import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
const showTopics = async ({ render, errors, name }) => {
  const topics = await topicService.getTopics();
  const data = { topics, errors, name };
  await render("topics.eta", data);
};
const showTopic = async ({ params, render, errorData, response }) => {
  const topicId = params.id;
  const topic = await topicService.findTopicById(topicId);
  const questions = await questionService.getTopicQuestions(topicId);
  const data = { ...errorData, topic, questions };
  if (!topic) {
    response.status = 404;
    return;
  }
  await render("topic.eta", data);
};
const topicRules = {
  name: [v.required, v.minLength(1)],
};
const addTopic = async ({ render, request, response }) => {
  const body = request.body();
  const params = await body.value;
  const name = params.get("name");
  const [passes, errors] = await v.validate({ name }, topicRules);
  if (passes) {
    //test if the same name already exists in the database
    const alreadyExists = await topicService.findTopicByName(name);
    if (alreadyExists) {
      errors.name = {
        unique: "name must be unique!",
      };
      await showTopics({ render, errors, name });
    } else {
      await topicService.createTopic(name, 1);
      response.redirect("/topics");
    }
  } else {
    console.log(errors);
    await showTopics({ render, errors, name });
  }
};
const removeTopic = async ({ response, params }) => {
  await topicService.removeTopic(params.id);
  await response.redirect("/topics");
};

export { showTopics, addTopic, showTopic, removeTopic };
