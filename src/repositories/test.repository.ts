import { client } from "../config/database.js"
import { CreateTestData } from "../services/test.service.js"

const insert = async (test: CreateTestData) => {
    await client.test.create({
        data: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: test.teacherDisciplineId,
        }
    })
}

const getAllTestsGroupedByDiscipline = async () => {
    return client.term.findMany({
        include: {
            Discipline: {
                include: {
                    TeacherDiscipline: {
                        include: {
                            Teacher: true,
                            tests: {
                                include: {
                                    Category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

async function getTestsByTeachers() {
    return client.teacherDiscipline.findMany({
        include: {
            Teacher: true,
            Discipline: true,
            tests: {
                include: {
                    Category: true,
                },
            },
        },
    });
}

export const testRepository = {
    insert,
    getAllTestsGroupedByDiscipline,
    getTestsByTeachers,
}