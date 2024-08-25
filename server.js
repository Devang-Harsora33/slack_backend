const { App } = require("@slack/bolt");

// Initialize your Bolt app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Respond to a global shortcut with a simple "Hello" modal
app.shortcut("global_new_task", async ({ shortcut, ack, client }) => {
  try {
    await ack(); // Acknowledge the shortcut

    // Open a simple "Hello" modal
    await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: "modal",
        callback_id: "hello_modal",
        title: {
          type: "plain_text",
          text: "Hello!",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Hello, world! 👋",
            },
          },
        ],
        submit: {
          type: "plain_text",
          text: "Close",
        },
      },
    });
  } catch (error) {
    console.error("Error opening modal:", error);
  }
});

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
