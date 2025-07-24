import { useEffect } from "react";
import { messaging, getToken, onMessage } from "./firebase";

function PushNotification() {
  useEffect(() => {
    // Ask for permission
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: "BMZf9Fq0B289OIfXKb6U7aeBNf-fnSI8RsgkcwMcDdzzl6VUMIZQQSnv2kZ850cQDSpzfamDRnU1xsIhNKr3Hq4"
        }).then((currentToken) => {
          if (currentToken) {
            console.log("FCM Token:", currentToken);
            // TODO: send this token to your backend to send notifications
          } else {
            console.warn("No registration token available.");
          }
        }).catch(console.error);
      }
    });

    // Foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      alert(payload.notification?.title || "New notification!");
    });
  }, []);

  return null;
}

export default PushNotification;
