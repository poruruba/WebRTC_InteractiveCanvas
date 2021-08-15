'use strict';

const base_url_html = '【WebページのURL】';

const AWS_ACCESSKEY_ID = '【AWSのアクセスキーID】';
const AWS_SECRET_ACCESSKEY = '【AWSのアクセスキーシークレット】';

const {
	conversation,
	Canvas,
} = require('@assistant/conversation')

const app = conversation({ debug: true });

app.handle('start', conv => {
	console.log(conv);
	conv.add('これはインタラクティブキャンバスです。');

	if (conv.device.capabilities.includes("INTERACTIVE_CANVAS") ){
		conv.add(new Canvas({
			url: base_url_html + '/interactivecanvas_webrtc/index_viewer.html',
			enableFullScreen: true,
			data: {
				AWS_ACCESSKEY_ID: AWS_ACCESSKEY_ID,
				AWS_SECRET_ACCESSKEY: AWS_SECRET_ACCESSKEY,
			}
		}));
	}else{
		conv.scene.next.name = 'actions.scene.END_CONVERSATION';
		conv.add('この端末はディスプレイがないため対応していません。');
	}
});

app.handle('continue', async conv => {
	console.log(conv);
	conv.add(new Canvas({
		data: {
			message: "continue"
		}
	}));
});

exports.fulfillment = app;
