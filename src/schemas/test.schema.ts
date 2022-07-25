import { CreateTestData } from "../services/test.service.js";
import joi from "joi";

export const testSchema = joi.object<CreateTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required(),
});
