//Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要がある
importScripts('cache-polyfill.js');

console.log('1回目の起動ならこの文言が表示されるはずです');
// console.log('swがちゃんと更新されていればこの文言が表示されるはず');

this.addEventListener('install', function(event) {
	console.log('バージョン1のsw.jsにてinstallイベントが発火しています');
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/pwa/css/bootstrap.min.css',
				'/pwa/css/full-width-pics.css'
			]);
		})
	);
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
