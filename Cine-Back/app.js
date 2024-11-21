import express from "express";
import cors from "cors";
import peliculasRouter from "./peliculas.js";
import loginRouter from "./login.js";
import { conectarDB } from "./db.js";

conectarDB();

app.use(cors());
app.use(express.json());

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo!");
});

app.use("/peliculas", peliculasRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
