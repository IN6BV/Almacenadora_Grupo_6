import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller.js";

const router = Router();

router.post(
    "/register",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("apellido", "El apellido no puede estar vacío").not().isEmpty(),
    ], userPost);

export default router;

