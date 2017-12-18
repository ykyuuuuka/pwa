//Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要がある
importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('my-cache').then(function(cache) {
			return cache.addAll([
				'/index.html',
				'/img/01.jpg',
				'/img/02.jpg',
				'/img/03.jpg'
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
