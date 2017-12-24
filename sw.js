//Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要がある
importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('my-cache').then(function(cache) {
			return cache.addAll([
				'index.html',
				'index2.html',
				'index4.html',
				'img/video.mp4',
				'img/video.jpg',
				'img/image01.jpg',
				'img/image02.jpg',
				'img/image03.jpg',
				'img/image04.jpg',
				'js/bootstrap.bundle.min.js',
				'js/jquery.min.js',
				'css/full-width-pics.css',
				'css/bootstrap.min.css'
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
