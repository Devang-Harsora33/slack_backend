const { App } = require("@slack/bolt");
const { globalNewTaskCallback } = require("./actions"); // Adjust the path as needed

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.shortcut("global_new_task", globalNewTaskCallback);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
