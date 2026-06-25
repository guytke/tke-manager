self.addEventListener('push', function(e) {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'TKE Manager', {
      body: data.body || '',
      icon: '/tke-manager/icon.png'
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://guytke.github.io/tke-manager/'));
});
