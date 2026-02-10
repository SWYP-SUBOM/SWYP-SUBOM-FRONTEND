importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC63fFJRwzNziuH8iO_-MzCl6aulAAJ6JE",
  authDomain: "seobom-209fb.firebaseapp.com",
  projectId: "seobom-209fb",
  storageBucket: "seobom-209fb.firebasestorage.app",
  messagingSenderId: "15576632753",
  appId: "1:15576632753:web:1e0cf844ba3c5bb98cc190",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/pwaicon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
