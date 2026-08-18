const express = require("express")
const cors = require("cors");

const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const followRoutes = require("./routes/follow.routes")
const contentRoutes = require("./routes/content.routes")
const likeRoutes = require("./routes/like.routes")
const conversationRoutes = require("./routes/conversation.routes")
const messageRoutes = require("./routes/message.routes")
const errorHandler = require("./middlewere/exception.middlewere")
const authenticate = require("./middlewere/auth.middleware")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

app.use(authenticate)

app.use("/api/user",userRoutes)
app.use("/api/follow", followRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/like", likeRoutes)
app.use("/api/conversation", conversationRoutes)
app.use("/api/message", messageRoutes)

app.use(errorHandler);

module.exports = app;