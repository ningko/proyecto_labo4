import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
  const [usuarios] = await db.execute("select * from usuario");
  res.send({ usuarios });
});

router.post(
  "/",
  body("username").isAlphanumeric().notEmpty().isLength({ max: 15 }),
  body("password").isStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array() });
      return;
    }

    const { username, password } = req.body;
    const contraseña = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "insert into usuario (username, password) values (?,?)",
      [username, contraseña]
    );
    res
      .status(201)
      .send({ usuario: { id_usuario: result.insertId, username } });
  }
);

export default router;
