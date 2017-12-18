//Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要がある
importScripts('/pwa/cache-polyfill.js');

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('my-cache').then(function(cache) {
			return cache.addAll([
				'/pwa/index.html',
				'/pwa/img/01.jpg',
				'/pwa/img/02.jpg',
				'/pwa/img/03.jpg'
			]);
		})
	);
});

self.addEventListener('fetch', function(e) {
	console.log(e.request.url);
	e.respondWith(
		caches.match(e.request)
			.then(function(response) {
				// キャッシュがあったのでそのレスポンスを返す
				if (response) {
					return response;
				}
				return fetch(e.request);
				//なかった時に勝手にキャッシュを作らないで欲しいのだが..
			}
		)
	);
});
