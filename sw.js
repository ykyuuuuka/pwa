console.log('sw.jsのスクリプトが実行されていればこのメッセージが表示されるし、version一個飛ばしている');

self.addEventListener('install', function(event) {
	console.log('V33 installing…');

	// skipWaiting() を使えば強制的にswを更新できる
	event.waitUntil(self.skipWaiting());
});


self.addEventListener('activate', function(event) {
	console.log('V33 activating…');

	// 強制的にclaim() を実行
	event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', function(event) {
	console.log('V33 fetching…');
});