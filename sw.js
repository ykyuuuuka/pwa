//sw.jsのバージョン管理
const VERSION = "03";
const STATIC_CACHE_KEY = 'version-' + VERSION;
const CACHE_KEYS = [
	STATIC_CACHE_KEY
];


//キャッシュ対象ファイル一覧
const STATIC_FILES = [
	'/img/video.jpg',
	'/img/image004.jpg'
];

self.addEventListener('install', function(event) {
	console.log(STATIC_CACHE_KEY + ' installing…');

	// skipWaiting() を使えば強制的にswを更新できる
	event.waitUntil(self.skipWaiting());

	//キャッシュを実施
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
});


self.addEventListener('activate', function(event) {
	console.log(STATIC_CACHE_KEY + ' activating…');

	// 強制的にclaim() を実行
	event.waitUntil(self.clients.claim());

	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys.filter(key => {
					return !CACHE_KEYS.includes(key);
				}).map(key => {
					return caches.delete(key);
				})
			);
		})
	);
});


self.addEventListener('fetch', function(event) {
	console.log(STATIC_CACHE_KEY + ' fetching…');
});