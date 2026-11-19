const C="fms-v16",F=["./","index.html","manifest.webmanifest","icon.svg","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||r.url.includes("googleapis.com"))return;
e.respondWith(fetch(r).then(n=>{if(n&&(n.ok||n.type=="opaque")){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n}).catch(()=>caches.match(r).then(m=>m||(r.mode=="navigate"?caches.match("index.html"):Response.error()))))});
