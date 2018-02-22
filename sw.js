console.log('sw.jsのスクリプトが実行されたはず');

self.addEventListener('install', function(event) {
	console.log('V1 installing…');
});

self.addEventListener('activate', function(event) {
	console.log('V1 activating…');
});

self.addEventListener('fetch', function(event) {
	console.log('V1 fetching…');
});