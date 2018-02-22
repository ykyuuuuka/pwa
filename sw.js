console.log('sw.jsのスクリプトが実行されていればこのメッセージが表示される');

self.addEventListener('install', function(event) {
	console.log('V3 installing…');

	// skipWaiting() を使えば強制的にswを更新できる
	event.waitUntil(self.skipWaiting());
});


self.addEventListener('activate', function(event) {
	console.log('V3 activating…');

	// 強制的にclaim() を実行
	event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', function(event) {
	console.log('V3 fetching…');
});