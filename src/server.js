import Server from 'socket.io';

export default function startServer() {
  const io = new Server().attach(8090);
  console.log('### Server started on port 8090 ###');

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // When user connects, give them current state
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
