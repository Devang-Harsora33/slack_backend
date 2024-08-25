const { modals } = require("./modals"); // Adjust the path to your modals file

// Expose callback function for testing
const globalNewTaskCallback = async ({ shortcut, ack, client }) => {
  try {
    await ack();
    await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: modals.newTask(null, shortcut.user.id),
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { globalNewTaskCallback };
