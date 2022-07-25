import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { createTest, getAll } from "../controllers/test.controller.js";
import { testSchema } from "../schemas/test.schema.js";

const router = Router();

router.post("/new", validateToken, validateSchema(testSchema), createTest);
router.get("/all", validateToken, getAll);
router.get("/teachers", validateToken, getAll);

export default router;