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

messaging.onBackgroundMessage((payload) => {
  console.log("[백그라운드 메시지 수신:", payload);

  // 서버에서 보낸 data 객체 내부의 값을 사용합니다.
  const notificationTitle = payload.data?.title || "새로운 알림이 왔어요!";
  const notificationOptions = {
    body: payload.data?.body || "내용을 확인해보세요",
    icon: "/pwaicon-192x192.png",
    badge: "/pwaicon-192x192.png",
    data: {
      url: payload.data?.url || "/home",
    },
  };

  // 브라우저에 알림 표시
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data.url;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // 이미 창이 열려있다면 포커스, 아니면 새로 열기
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
