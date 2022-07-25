import { Router } from "express";
import authRouter from "./auth.router.js";
import testRouter from "./test.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);

export default router;