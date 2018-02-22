//Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要がある
// importScripts('cache-polyfill.js');

//たぶんキャッシュDBの名称定義
const expectedCaches = ['static-v2'];

self.addEventListener('install', function(event) {
	console.log('V1 installing…');
	event.waitUntil(
		caches.open('static-v2').then(function(cache) {
			return cache.addAll([
				'/pwa/img/video.jpg'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	console.log('V1 activating…');
});

// self.addEventListener('install', function(e) {
// 	e.waitUntil(
// 		caches.open('my-cache').then(function(cache) {
// 			return cache.addAll([
// 				'index.html',
// 				'index2.html',
// 				'index4.html',
// 				'img/video.mp4',
// 				'img/video.jpg',
// 				'img/image01.jpg',
// 				'img/image02.jpg',
// 				'img/image03.jpg',
// 				'img/image04.jpg',
// 				'js/bootstrap.bundle.min.js',
// 				'js/jquery.min.js',
// 				'css/full-width-pics.css',
// 				'css/bootstrap.min.css'
// 			]);
// 		})
// 	);
// });

// self.addEventListener('fetch', function(e) {
// 	console.log(e.request.url);
// 	e.respondWith(
// 		caches.match(e.request)
// 			.then(function(response) {
// 				if (response) {
// 					return response;
// 				}
// 				return fetch(e.request);
// 			}
// 		)
// 	);
// });


//Push function
// self.addEventListener('push', function (event) {
// 	console.log('Received a push message', event);
// 	var title = "プッシュ通知です！";
// 	var body = "プッシュ通知はこのようにして送られるのです";

// 	event.waitUntil(
// 		self.registration.showNotification(title, {
// 			body: body,
// 			icon: 'http://free-images.gatag.net/images/201108090000.jpg',
// 			tag: 'push-notification-tag'
// 		})
// 	);
// });
// self.addEventListener('notificationclick', function (event) {
// 	event.notification.close();
// 	clients.openWindow("/");
// }, false);
