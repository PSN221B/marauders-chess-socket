const server = require('http').createServer();
const io = module.exports.io = require('socket.io')(server);

const PORT = 3001;
user = 0; 

io.on('connection', (socket) => {
  console.log('a user connected');
  
  if(user<3)
  {
    user+=1;
    socket.emit('user',user);
  }
  
  // When some move is made
  socket.on('move made',(state)=>{
    // Send all players the new state of the game
    io.emit('board changed',state);  
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});  

server.listen(PORT, () => {
  console.log('listening on :' + PORT);
});
