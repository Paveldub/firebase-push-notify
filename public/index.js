/** Global constants */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAMMh-qyjwbI_2EjtZW3R_YgKBqele-BQ8",
  authDomain: "home-push-d7332.firebaseapp.com",
  databaseURL: "https://home-push-d7332.firebaseio.com",
  projectId: "home-push-d7332",
  storageBucket: "home-push-d7332.appspot.com",
  messagingSenderId: "246649819096",
  appId: "1:246649819096:web:0c525e3fbac4a11f"
};

document.addEventListener("DOMContentLoaded", () => {
  /** Form elemets and events */
  var form = document.getElementById("send-notification-form"),
    textAreaField = document.getElementById("notification-message");

  form.addEventListener("submit", e => {
    e.preventDefault();
    let pushData = {
      user: auth.currentUser.uid,
      message: textAreaField.value,
      icon: "icon.png"
    };

    database
      .ref("/notifications")
      .push(pushData)
      .then(() => {
        console.log(
          "%c%s",
          "color: green; font: 1.2rem/1 Tahoma;",
          "Notification successful sended"
        );
        textAreaField.value = "";
      })
      .catch(error =>
        console.warn(
          "%c%s",
          "color: red; font: 1.2rem/1 Tahoma;",
          "Notification didn't push.",
          error
        )
      );

    console.log("Request: ", pushData);
  });

  /** Initialisating app */
  firebase.initializeApp(FIREBASE_CONFIG);
  var auth = firebase.auth(),
    messaging = firebase.messaging(),
    database = firebase.database();

  auth
    .signInAnonymously()
    .then(() => {
      return messaging.requestPermission();
    })
    .then(() => {
      return messaging.getToken();
    })
    .then(token => {
      database.ref("/tokens").push({
        token: token,
        uid: auth.currentUser.uid
      });
    })
    .then(() =>
      console.log(
        "%c Successful access",
        "font-weight: bold; font-size: 50px;color: green; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
      )
    )
    .catch(error =>
      console.warn(
        "%c%s",
        "color: red; font: 1.2rem/1 Tahoma;",
        "User didn't give the permission",
        error
      )
    );

  messaging.onMessage(payload => console.log("onMessage: ", payload));
});
