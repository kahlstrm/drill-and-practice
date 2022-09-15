import { executeQuery } from "../database/database.js";
const getTopics = async () => {
  //fetch
  const res = await executeQuery(
    "SELECT t.*,count(q.id) as question_count from topics as t left join questions as q on t.id=q.topic_id GROUP BY (t.id) ORDER BY t.name"
  );
  return res.rows;
};
const createTopic = async (name, user_id) => {
  await executeQuery(
    "INSERT INTO topics (name,user_id) values ($name,$user_id)",
    { name, user_id }
  );
};
const findTopicById = async (id) => {
  const res = await executeQuery("SELECT * FROM topics WHERE id=$id", { id });
  if (res.rows.length == 0) {
    return null;
  }
  return res.rows[0];
};
const findTopicByName = async (name) => {
  const res = await executeQuery("SELECT * FROM topics WHERE name=$name", {
    name,
  });
  if (res.rows.length == 0) {
    return null;
  }
  return res.rows[0];
};
export { createTopic, findTopicById, findTopicByName, getTopics };
