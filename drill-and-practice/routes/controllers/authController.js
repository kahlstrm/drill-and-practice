import { validasaur as v } from "../../deps.js";
import * as authService from "../../services/authService.js";
const showLogin = ({ render, errorData }) => {
  render("authpage.eta", { ...errorData, action: "login" });
};
const showRegister = ({ render, errorData }) => {
  render("authpage.eta", { ...errorData, action: "register" });
};
const validationRules = {
  email: [v.required, v.isEmail],
  password: [v.required, v.minLength(4)],
};
const registerAccount = async ({ render, request, state, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");
  const [passes, errors] = await v.validate(
    { email, password },
    validationRules
  );
  if (passes) {
    const alreadyExists = await authService.findAccountByEmail(email);
    if (alreadyExists) {
      errors.email = { unique: "Account already exists" };
      const errorData = { email, password, errors };
      return showRegister({ render, errorData });
    }
    const user = await authService.register(email, password);
    await state.session.set("user", user);
    response.redirect("/");
  } else {
    const errorData = { email, errors };
    showRegister({ render, errorData });
  }
};
const logIn = async ({ render, request, state, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");
  const errors = {};
  const user = await authService.login(email, password);
  if (!user) {
    errors.password = { error: "Incorrect email/password" };
    const errorData = { email, errors };
    return showLogin({ render, errorData });
  }
  await state.session.set("user", user);
  response.redirect("/topics");
};
const logOut = async (ctx) => {
  await ctx.state.session.deleteSession(ctx);
  ctx.response.redirect("/");
};
const guestLogin = async ({ user, state, response }) => {
  if (user) {
    response.status = 400;
    return;
  }
  await state.session.set("user", { email: "guest@guest.com", id: 0 });
  response.redirect("/topics");
};
export { guestLogin, showLogin, showRegister, registerAccount, logIn, logOut };
