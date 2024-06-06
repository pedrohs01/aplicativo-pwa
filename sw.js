// Nome do cache (controle de versão)
const cachePWA = 'cache-v1'
// Arquivos a serem armazenados em cache
// todos os arquivos devem ser adicionados ao vetor (exceto o manifesto)
const urlsToCache = [
  '/',
  '/index.html',  
  '/euro192',
  '/euro.png',
  '/euro-real.png'
]

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request)
      })
  )
})

// Função para mostrar uma notificação ao usuário
function showNotification(title, options) {
  if (Notification.permission === 'granted') {
    self.registration.showNotification(title, options);
  } else {
    console.log('Permissão para notificações não concedida.');
  }
}

// Interceptação de uma mensagem de solicitação de permissão
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'request-camera-permission') {
    // Verifica se as notificações são suportadas no navegador
    if (!('Notification' in self)) {
      console.log('Este navegador não suporta notificações.');
    } else if (Notification.permission === 'granted') {
      console.log('Permissão para notificações já concedida.');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Permissão para notificações concedida.');
          showNotification('Permissão concedida', { body: 'Agora você pode acessar a câmera.' });
        }
      });
    }
  }
});
