//sw.jsのバージョン管理
const VERSION = "01";
const STATIC_CACHE_KEY = 'version-' + VERSION;


//キャッシュ対象ファイル一覧
const STATIC_FILES = [
	'/img/1080.jpeg',
	'/img/1080_2.jpeg'
];

self.addEventListener('install', function(event) {
	console.log(STATIC_CACHE_KEY + ' installing…');

	event.waitUntil(
		caches.open(STATIC_CACHE_KEY).then(cache => {
			return Promise.all(
				STATIC_FILES.map(url => {
					return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
						return cache.put(url, response);
					});
				})
			);
		})
	);
	// skipWaiting() を使えば強制的にswを更新できる
	event.waitUntil(self.skipWaiting());
});


self.addEventListener('activate', function(event) {
	console.log(STATIC_CACHE_KEY + ' activating…');

	// 強制的にclaim() を実行
	event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', function(event) {
	console.log(STATIC_CACHE_KEY + ' fetching…');

	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});