import express from "express";
import cors from "cors";
import peliculasRouter from "./peluculas.js";

app.use(cors());
app.use(express.json());

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/peliculas", peliculasRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
