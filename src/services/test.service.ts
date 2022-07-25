import { Test } from "@prisma/client";
import { categoryRepository } from "../repositories/category.repository.js";
import { teacherDisciplineRepository } from "../repositories/teacherDiscipline.repository.js";
import { testRepository } from "../repositories/test.repository.js";

export type CreateTestData = Omit<Test, "id">;

const categoryExists = async (categoryId: number) => {
    const category = await categoryRepository.getCategoryById(categoryId);

    if(!category) {
        throw {
            type: "not_found",
            message: "Category not found",
        }
    }

    return category;
}

const teacherDisciplineExists = async (teacherDisciplineId: number) => {
    const teacherDiscipline = await teacherDisciplineRepository.getTeacherDisciplineById(teacherDisciplineId);

    if(!teacherDiscipline) {
        throw {
            type: "not_found",
            message: "Relation teacher-discipline not found",
        }
    }

    return teacherDiscipline;
}

const insert = async (test: CreateTestData) => {
    await categoryExists(test.categoryId);
    await teacherDisciplineExists(test.teacherDisciplineId);

    return await testRepository.insert(test);
}

const getAllTestsGroupedByDiscipline = async () => {
    return await testRepository.getAllTestsGroupedByDiscipline();
}

const getTestsByTeachers = async () => {
    return await testRepository.getTestsByTeachers();
}


export const testService = {
    insert,
    getAllTestsGroupedByDiscipline,
    getTestsByTeachers,
}