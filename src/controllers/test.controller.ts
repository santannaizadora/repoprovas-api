import { Request, Response } from "express";
import { CreateTestData, testService } from "../services/test.service.js";

export const createTest = async (req: Request, res: Response) => {
    const { name, pdfUrl, categoryId, teacherDisciplineId }: CreateTestData = req.body;
    await testService.insert({name, pdfUrl, categoryId, teacherDisciplineId});
    res.sendStatus(201);
}

export const getAll = async (req: Request, res: Response) => {
    const tests = await testService.getAllTestsGroupedByDiscipline();
    res.json(tests);
}

export const getTestsByTeachers = async (req: Request, res: Response) => {
    const tests = await testService.getTestsByTeachers();
    res.json(tests);
}
