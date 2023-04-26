const nombreCache = 'apv-v3'
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
]

// instalar el service worker
self.addEventListener('install', e => {
    console.log('Se instaló correctamente')
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheando...')
                cache.addAll(archivos)
            })

    )
})

// activar el service worker
self.addEventListener('activate', e => {
    console.log('Se activo correctamente')
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter( key => key !== nombreCache)
                        .map(key => caches.delete(key))
                )
            })
    )
})

// Evento fetch para descagar archivos e instalarlos
self.addEventListener('fetch', e => {
    console.log('Fetch...', e)
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache
            })
            .catch(() => caches.match('/error.html'))
    )
})