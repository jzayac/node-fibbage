
export default (io) => {
  io.on('news', (data) => {
    io.emit('my other event', { my: 'data from client' });
  });

  io.on('msg', (data) => {
    console.log(data);
  });

  io.on('error', (error) => {
    console.error('SOCKET error :' + error);
  });

};
