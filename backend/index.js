const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const loginsRouter = require('./routes/logins');
const productsRouter = require('./routes/products');
const ordersRouter=require('./routes/orders');
const bodyParser = require('body-parser');
const requestsRouter = require('./routes/requests');
const sellsRouter=require('./routes/sells');
const { Server } = require("socket.io");
const http = require('http');
const donatesRouter = require('./routes/donates');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
mongoose.connect("mongodb://localhost:27017/CampusKart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => console.log(err));

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
  
  

app.use('/api/logins', loginsRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/requests',requestsRouter);
app.use('/api/sells',sellsRouter);
app.use('/api/donates',donatesRouter);

server.listen(8080, () => {
  console.log('Backend running and server up and running at 8080!');
});