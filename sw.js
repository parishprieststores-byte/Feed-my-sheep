const C="fms-v7",F=["./","index.html","manifest.webmanifest","icon.svg","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(fetch(e.request).then(n=>{if(n&&(n.ok||n.type=="opaque")){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
