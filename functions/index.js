const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotifications = functions.database
  .ref("/notifications/{notificationId}")
  .onWrite(change => {
    // https://firebase.google.com/docs/reference/functions/functions.Change.html

    const snapshot = change.after;

    console.log("snapshot", snapshot);

    const notification1 = snapshot.val();

    console.log("notification", notification1);

    const payload = {
      notification: {
        title: `New message from FLO`,
        body: JSON.stringify(notification1.message),
        icon: "../icon.png",
        click_action: `https://flo.health`
      }
    };

    let tokens = [];

    return admin.database().ref("/tokens").once("value").then(snapshot2 => {
      snapshot2.forEach(childSnapshot => {
        const data = childSnapshot.val();
        if (data) {
          tokens = tokens.concat(data.token);
        }
      });

      console.log(tokens);
      return admin.messaging().sendToDevice(tokens, payload);
    });
  });
