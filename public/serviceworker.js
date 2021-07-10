

const CASHE_NAME = 'version01'
const urlsToCache = ['index.html','offline.html']

const self = this

//install SW
self.addEventListener('install', (e)=>{
    //waiting until something is done
    e.waitUntil(
        caches.open(CASHE_NAME)
        .then((cache)=>{
            console.log("Open", cache)
            return cache.addAll(urlsToCache)
        })
    )
})

//listen request
self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request)
        .then(()=>{
            return fetch(e.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
})

//Activate the SW
self.addEventListener('activate', (e)=>{
    //in order to keep the last cache
    const cacheWhiteList = []
    cacheWhiteList.push(CASHE_NAME)

    e.waitUntil(
        caches.keys()
        .then((cacheNames)=>{
            cacheNames.map((cacheName)=>{
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        })
    )
    
})