module.exports = function sendUpdateEmail(ctx, { user }) {
  console.log("USER EMAIL: ", user.email);
  return ctx.sendMail('update', { to: user.email, subject: 'One of your subscriptions has been updated!' }, { user });
};
