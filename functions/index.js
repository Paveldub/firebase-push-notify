const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotifications = functions.database.ref('/notifications/{notificationId}').onWrite((snapshot)=>{

    const payload = {
        notification: {
            title: `New message from FLO`,
            body: snapshot.val().message,
            icon: '../icon.png',
            click_action: `https://flo.health`
        }
    };
    
    console.log(payload);

    let tokens = [];

    console.log(tokens);
    
    return admin.database().ref('/notifications').once('value').then((snapshot) => snapshot.forEach(token => {

        if (token.val()) {

            tokens = tokens.concat(token.val().token);
            return admin.messaging().sendToDevice(tokens, payload);
        }

    }))
});




