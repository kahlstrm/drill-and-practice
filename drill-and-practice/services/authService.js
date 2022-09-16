import { bcrypt } from "../deps.js";
import { executeQuery } from "../database/database.js";
const findAccountByEmail = async (email) => {
  const res = await executeQuery("SELECT * FROM users WHERE email=$email", {
    email,
  });
  return res.rows[0];
};
const register = async (email, password) => {
  const pwHash = await bcrypt.hash(password.trim());
  const res = await executeQuery(
    "INSERT INTO users (email,password) values($email,$pwHash) RETURNING id,email,admin",
    {
      email: email.trim(),
      pwHash,
    }
  );
  return res.rows[0];
};
const login = async (email, password) => {
  const account = await findAccountByEmail(email);
  if (!account) {
    return null;
  }
  const res = await bcrypt.compare(password.trim(), account.password);
  if (res) {
    const { admin, id, email } = account;
    return { admin, id, email };
  } else {
    return null;
  }
};

export { register, login, findAccountByEmail };
