const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const articleRouter = require("./routes/article-routes");
const commentRouter = require("./routes/comment-routes");
const answerRouter = require("./routes/answer-routes");
const searchRouter = require("./routes/search-routes");
const config = require("config");

const PORT = process.env.PORT || config.get("serverPort");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/images"));
app.use(fileUpload({}));

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", blogRouter);
app.use("/api", articleRouter);
app.use("/api", commentRouter);
app.use("/api", answerRouter);
app.use("/api", searchRouter);

app.listen(PORT, () => console.log("Started server on", PORT));
