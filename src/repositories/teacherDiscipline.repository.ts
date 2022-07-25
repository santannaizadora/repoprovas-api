import { client } from "../config/database.js";

export const getTeacherDisciplineById = async (id : number) => {
    return await client.teacherDiscipline.findUnique({
        where: {
            id,
        },
    });
}

export const teacherDisciplineRepository = {
    getTeacherDisciplineById,
}