const server = require('http').createServer();

const io = require('socket.io')({
	path: '/',
	reconnection: true,
	reconnectionAttempts: Infinity,
	serveClient: false,
	transports: ['websocket', 'xhr-polling'],
	methods: ['GET', 'POST'],
	cors: {
		origin: '*',
	},
});

io.attach(server, {
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false,
});

let users = [];

const addUser = (userId, role, socketId) => {
	if (!users.some((user) => user.socketId === socketId)) {
		users.push({ userId, role, socketId });
	}
};

const removeUser = (id) => {
	users = users.filter((user) => user.socketId !== id);
	return users;
};

const getUser = (userId) => {
	return users.filter((user) => user.userId === userId).map((u) => u.socketId);
};

const getUserWithoutCurrent = (userId, socket) => {
	return users
		.filter((user) => user.userId === userId && user.socketId !== socket.id)
		.map((u) => u.socketId);
};

io.on('connection', (socket) => {
	//take userId and socketId from user
	socket.on('addUser', ({ userId, role }) => {
		addUser(userId, role, socket.id);
		socket.join('group-chat');
		// console.log('addUser', users);
		io.emit('getUsers', [...new Set(users.map((u) => u.userId))]);
	});

	socket.on('getOnlineUsers', () => {
		console.log('getOnlineUsers', users);
		io.emit('getUsers', [...new Set(users.map((u) => u.userId))]);
	});

	socket.on('changeForDashboard', (userId) => {
		let receivers = userId;
		if (!Array.isArray(userId)) receivers = [userId];
		const admins = users.filter((u) => u.role === 1).map((u) => u.userId);
		const newArr = [...receivers, ...admins];

		newArr.forEach((r) => {
			const usersR = getUser(r);
			usersR.length && io.to(usersR).emit('renderDispatcherDashboard');
		});
	});

	socket.on('updateUnreadMessagesForUsers', ({ receiverId, senderId }) => {
		const usersR = getUser(receiverId);
		const usersS = getUser(senderId);
		usersR.length && io.to(usersR).emit('updateUnreadMessages');
		usersS.length && io.to(usersS).emit('updateUnreadMessages');
	});

	socket.on('readMessagesForCurrentChat', ({ receiverId, senderId }) => {
		const usersR = getUser(receiverId);
		const usersS = getUserWithoutCurrent(senderId, socket);
		const allUsersS = getUser(senderId);
		usersR.length && io.to(usersR).emit('readMessagesForCurrentChatToClient');
		usersS.length && io.to(usersS).emit('readMessagesForCurrentChatToClient');
		allUsersS.length && io.to(allUsersS).emit('updateUnreadMessages');
	});

	socket.on('updateUnreadMessagesForCurrentUser', ({ count, senderId }) => {
		const usersS = getUserWithoutCurrent(senderId, socket);
		usersS.length && io.to(usersS).emit('getCountOfUnreadMessages', count);
	});

	// socket.on('readMessagesForCurrentChat', ({ id, senderId }) => {
	// 	const usersS = getUserWithoutCurrent(senderId, socket);
	// 	usersS.length && io.to(usersS).emit('readMessagesForCurrentChatToClient', id);
	// });

	socket.on('unreadLastMessageForCurrentChat', ({ id, senderId }) => {
		const usersS = getUser(senderId, socket);
		usersS.length && io.to(usersS).emit('unreadLastMessageForCurrentChatToClient', id);
	});

	socket.on('sendMessageToGroupChat', (message) => {
		socket.broadcast.to('group-chat').emit('getMessageFromGroupChat', message);
	});

	//send and get message
	socket.on('sendMessage', ({ receiverId, senderId, message, chatPrivateId }) => {
		const usersR = getUser(receiverId);
		const usersS = getUserWithoutCurrent(senderId, socket);

		usersR.length && io.to(usersR).emit('getMessage', { message, chatPrivateId });
		usersS.length && io.to(usersS).emit('getMessage', { message, chatPrivateId });
		usersR.length && io.to(usersR).emit('updateUnreadMessages');
	});

	socket.on('deleteMessages', ({ receiverId, ...chatData }) => {
		const usersR = getUser(receiverId);
		usersR.length && io.to(usersR).emit('deleteMessagesToReceiver', chatData);
	});

	socket.on('sendNotice', (receiverId, message, type = 'info') => {
		let receivers = receiverId;
		if (!Array.isArray(receiverId)) receivers = [receiverId];

		const admins = users.filter((u) => u.role === 1).map((u) => u.userId);
		const newArr = [...receivers, ...admins];

		newArr.forEach((r) => {
			const usersR = getUser(r);
			usersR.length && io.to(usersR).emit('receiveNotice', message, type);
		});
	});

	//when disconnect
	socket.on('disconnect', () => {
		removeUser(socket.id);
		// console.log('disconnect', users);
		io.emit('getUsers', [...new Set(users.map((u) => u.userId))]);
	});

	socket.on('kick', (id) => {
		removeUser(socket.id);
		socket.leave('group-chat');
		console.log('kick', socket.id);
		io.emit('getUsers', [...new Set(users.map((u) => u.userId))]);
	});

	socket.on('reconnect', function () {
		console.log('reconnect', users);
		console.log('reconnect fired!');
	});
});

server.listen(8000, function () {
	console.log('listening on *:8000');
});
function reduceArr(arr, reducer, startValue = null) {
	let accumulator = startValue;
	for (let i = 0; i < arr.length; i++) {
		accumulator = reducer(accumulator, arr[i]);
	}
	return accumulator;
}

// examples
reduceArr([1, 2], (acc, curr) => acc + curr, 0);

// examples
reduceArr([1, 2], (acc, curr) => acc + curr, 0); // 3
/*
 * 1. (acc = 0, curr = 1) => 1
 * 2. (acc = 1, curr = 2) => 3
 *
 * */

reduceArr([1, 2], (acc, curr) => acc + ' ' + curr, ''); // "1 2"
