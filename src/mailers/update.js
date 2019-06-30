module.exports = function sendUpdateEmail(ctx, { follower ,  senador , SenadorPath}) {
  console.log("USER EMAIL: ", follower.email);
  return ctx.sendMail('update', { to: follower.email, subject: 'One of your subscriptions has been updated!' }, { follower,  senador, SenadorPath});
};
