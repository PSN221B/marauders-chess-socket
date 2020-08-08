const server = require('http').createServer();
const io = require('socket.io')(server);

/*
  users code
  0 - no user present
  1 - only white present
  2 - bothw white and black present
  3 - only black present
*/
var rooms = {
  111:{
    state:null,
    users:0
  }
};
const PORT = 3001;
user = 0; 

io.on('connection', (socket) => {
  // console.log('a user connected');
  socket.on('send roomId',(roomId,state)=>{
    if(roomId in rooms)
    {
      console.log(roomId+' room present');
      if(user===0) 
      {
        rooms[roomId] = {...rooms[roomId],state}; 
        user=1;
        socket.emit('user',1,rooms[roomId].state);
      }
      else if(user===1)
      {
        user=2;
        socket.emit('user',2,rooms[roomId].state);
        io.emit('second joined');
      } 
    }
  });  
  
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
