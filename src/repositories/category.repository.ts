import { client } from "../config/database.js";

const getCategoryById = async (id: number) => {
    return await client.category.findUnique({
        where: {
            id,
        },
    });
}

export const categoryRepository = {
    getCategoryById,
}