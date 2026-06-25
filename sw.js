self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch { data = { title: 'TKE Manager', body: e.data ? e.data.text() : '' }; }
  const title = data.title || 'TKE Manager';
  const options = { body: data.body || '', icon: '/icon.png', badge: '/icon.png', dir: 'rtl', lang: 'he' };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url && 'focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow('/');
  }));
});
