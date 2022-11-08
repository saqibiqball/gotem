const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.NEXT_CLIENT_PORT || 3000;

app.prepare().then(() => {
	const server = express();
	server.all('*', (req, res) => {
		return handle(req, res);
	});
	server.listen(PORT, () => {
		console.log(
			`Server started on link ${process.env.NEXT_PUBLIC_CLIENT_URL} on port ${PORT} !!! Happy Hacking :)`
		);
	});
});
