import pkg from "@slack/bolt";
const { App } = pkg;
import dotenv from "dotenv";
// import { globalNewTaskCallback } from "./actions.js";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

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

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
