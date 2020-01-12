const express = require("express");
const routes = require("./routes");
const mangoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

mangoose.connect(
  "mongodb+srv://marcelo:1234@omnistack-pvnlc.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use((req, res, next) => {
  (req.io = io), (req.connectedUsers = connectedUsers);
  return next();
});

//GET, POST, PUT, DELETE
//req.query = acessar query params (para filtros)
//req.params = acessar route params (para edição, deletar)
//req.body = acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

server.listen(3333);
