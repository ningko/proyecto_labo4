import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/",
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
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
    const [usuarios] = await db.execute(
      "select * from usuarios where username=?",
      [username]
    );

    if (usuarios.length === 0) {
      res
        .status(400)
        .send({ error: "El usuario o contraseña es invalido, reintetar" });
      return;
    }
    const passwordComparada = await bcrypt.compare(
      password,
      usuarios[0].password
    );
    if (!passwordComparada) {
      res
        .status(400)
        .send({ error: "El usuario o contraseña es invalido, reintetar" });
      return;
    }
    // aqui esta el errrrrrrrrrrrrrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    const payload = { username, rol: "admin", dato: 123 };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.send({ token });
  }
);

export default router;
