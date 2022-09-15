const authMiddleware = async (ctx, next) => {
  const { state, request, response } = ctx;
  const path = request.url.pathname;
  const user = await state.session.get("user");
  if (!user && (path.startsWith("topics", 1) || path.startsWith("quiz", 1))) {
    response.redirect("/auth/login");
    return;
  }
  ctx.user = user;
  await next();
};
export { authMiddleware };
