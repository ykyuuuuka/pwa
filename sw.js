//sw.jsのバージョン管理
const VERSION = "10";
const STATIC_CACHE_KEY = 'version-' + VERSION;
const CACHE_KEYS = [ STATIC_CACHE_KEY ];


//キャッシュ対象ファイル一覧
const STATIC_FILES = [
	'/pwa/img/image01.jpg',
	'/pwa/img/image02.jpg',
	'/pwa/img/image03.jpg',
	'/pwa/img/image04.jpg'
];

//アプリ関連ファイル一覧
const STATIC_FILES = [
	'/pwa/app/index.html',
	'/pwa/app/css/bootstrap.min.css',
	'/pwa/app/css/full-width-pics.css',
	'/pwa/app/js/bootstrap.bundle.min.js',
	'/pwa/app/js/jquery.min.js',
	'/pwa/app/img/app_01.jpeg',
	'/pwa/app/img/app_02.jpeg'
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

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});