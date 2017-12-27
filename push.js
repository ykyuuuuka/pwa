// 'use strict';

// const push = require('web-push');

// const GCM_API_KEY = 'AIzaSyByQsBd9GRa9kxR6NWPYQRzHc-Jfw0HuAs';
// push.setGCMAPIKey(GCM_API_KEY);

// const data = {
// 	'endpoint': 'https://android.googleapis.com/gcm/send/eDHsFIEiur4:APA91bEkutRTkRTErxGJNzmafa3ZM9NS5JEwpV2DnFu3kAlPIZZApAnBYt-L0Pe4O_KU_8ym-_bguKyD5bXirL0W9aZMfUg7ii9KzUdFjmnTMrkJo942HhLUSJwG_Avl23IILJoyZj7B',
// 	'userAuth': '3aAUCzs/azZDndQANGhjag==',
// 	'userPublicKey': 'BNDAvDlXTimNHp3RaPXjnt1wocrPtwZGwpNi0JIi/tW0s1tXcvTsv/SgixKNar4oowa8TYB/MQEc5QlQcXHi6Tc='
// };

// const pushSubscription = {
// 	endpoint: data.endpoint,
// 	keys: {
// 		auth: data.userAuth,
// 		p256dh: data.userPublicKey
// 	}
// }

// push.sendNotification(pushSubscription,'Hi! How are you?')
// 	.then(function(result) {
// 	console.log("success!");
// 		console.log(result);
// 	})
// 	.catch(function(err) {
// 	console.log("fail!");
// 		console.error(err);
// 	});


self.addEventListener("push", function(event) {
	event.waitUntil(
		self.registration.showNotification("Push通知タイトル", {
			body: "Push通知本文"
		})
	)
})