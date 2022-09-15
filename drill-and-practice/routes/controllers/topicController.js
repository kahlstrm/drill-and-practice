import {
  minLength,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as topicService from "../../services/topicService.js";
const showTopics = async ({ render, errors }) => {
  const topics = await topicService.getTopics();
  const data = { topics };
  console.log(topics);
  await render("topics.eta", { ...data, errors });
};
const addTopic = async ({ render, request, response }) => {
  const body = request.body();
  const params = await body.value;
  const name = params.get("name");
  const rules = {
    name: [required, minLength(1)],
  };
  const [passes, errors] = await validate({ name }, rules);
  if (passes) {
    //test if the same name already exists in the database
    const alreadyExists = await topicService.findTopicByName(name);
    if (alreadyExists) {
      errors.name = {
        unique: "name must be unique!",
      };
      showTopics({ render, request, errors });
    } else {
      await topicService.createTopic(name, 1);
      response.redirect("/topics");
    }
  } else {
    console.log(errors);
    showTopics({ render, request, errors });
  }
};

export { showTopics, addTopic };
