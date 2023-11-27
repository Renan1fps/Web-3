import express from "express";
import cors from "cors";
import { animesRoutes } from "./routes/anime.routes";
import { userRoutes } from "./routes/user.routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(animesRoutes);
app.use(userRoutes);

app.listen(8000, () => {
  console.log("Server running");
});
