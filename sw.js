//sw.jsのバージョン管理
const VERSION = "##";
const STATIC_CACHE_KEY = 'version-' + VERSION;
const CACHE_KEYS = [ STATIC_CACHE_KEY ];


//キャッシュ対象ファイル一覧
const STATIC_FILES = [
	'/pwa/img/cache/01.jpg',
	'/pwa/img/cache/02.jpg',
	'/pwa/img/cache/03.jpg',
	'/pwa/img/cache/04.jpg',
	'/pwa/img/cache/05.jpg',
	'/pwa/img/cache/06.jpg',
	'/pwa/img/cache/07.jpg',
	'/pwa/img/cache/08.jpg',
	'/pwa/img/cache/09.jpg',
	'/pwa/img/cache/10.jpg',
	'/pwa/img/cache/11.jpg',
	'/pwa/img/cache/12.jpg',
	'/pwa/img/cache/video.jpg',
	'/pwa/img/cache/video.mp4',
	'/pwa/cache/pictures.html',
	'/pwa/cache/movie.html',
	'/pwa/css/bootstrap.min.css',
	'/pwa/css/full-width-pics.css',
	'/pwa/js/bootstrap.bundle.min.js',
	'/pwa/js/jquery.min.js'
];

//アプリ関連ファイル一覧
const APP_FILES = [
	// '/pwa/app/index.html',
	// '/pwa/app/css/bootstrap.min.css',
	// '/pwa/app/css/full-width-pics.css',
	// '/pwa/app/js/bootstrap.bundle.min.js',
	// '/pwa/app/js/jquery.min.js',
	// '/pwa/app/img/app_01.jpeg',
	// '/pwa/app/img/app_02.jpeg'
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

	//アプリに必要なリソースキャッシュを実行
	// event.waitUntil(
	// 	caches.open(STATIC_CACHE_KEY).then(cache => {
	// 		return Promise.all(
	// 			APP_FILES.map(url => {
	// 				return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
	// 					return cache.put(url, response);
	// 				});
	// 			})
	// 		);
	// 	})
	// );
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


self.addEventListener('push', function (event) {
		console.log('Received a push message', event);
		var title = "プッシュ通知です！";
		var body = "テキストが入ります。";

		event.waitUntil(
				self.registration.showNotification(title, {
						body: body,
						icon: 'http://free-images.gatag.net/images/201108090000.jpg',
						tag: 'push-notification-tag'
				})
		);
});
self.addEventListener('notificationclick', function (event) {
		event.notification.close();
		clients.openWindow("/");
}, false);
















