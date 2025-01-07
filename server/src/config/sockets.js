import fastifySocketIO from 'fastify-socket.io';

const registerSocketIO = async (app) => {
    app.register(fastifySocketIO, {
        cors: {
            origin: "*",
        },
        pingInterval: 10000,
        pingTimeout: 5000,
        transports: ['websocket'],
    });

    app.ready().then(() => {
        app.io.on('connection', (socket) => {
            console.log('a user connected');


            socket.on('joinRoom', (orderId) => {
                socket.join(orderId);
                console.log(`user joined room: ${orderId}`);
            });

            socket.on('leaveRoom', (room) => {
                socket.leave(room);
                console.log(`user left room: ${room}`);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    });
};

export default registerSocketIO;
