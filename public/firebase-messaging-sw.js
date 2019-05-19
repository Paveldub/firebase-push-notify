importScripts ('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js');
importScripts ('https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js');

firebase.initializeApp ({
   apiKey: "AIzaSyAMMh-qyjwbI_2EjtZW3R_YgKBqele-BQ8",
   authDomain: "home-push-d7332.firebaseapp.com",
   databaseURL: "https://home-push-d7332.firebaseio.com",
   projectId: "home-push-d7332",
   storageBucket: "home-push-d7332.appspot.com",
   messagingSenderId: "246649819096",
   appId: "1:246649819096:web:0c525e3fbac4a11f"
});

var messaging = firebase.messaging ();
messaging.setBackgroundMessageHandler (payload => {
   console.log('[firebase-messaging-sw.js] Received background message ', payload);
   
   let notificationTitle = 'Background Message Title',
      notificationOptions = {
         body: 'Background Message body.',
         icon: 'icon.png'
      };
 
   return self.registration.showNotification(notificationTitle,
     notificationOptions);
});