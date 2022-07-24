import { User } from "@prisma/client";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import '../setup.js';

import { userRepository } from "../repositories/user.repository.js";

export type CreateUserData = Omit<User, "id">;
const cryptr = new Cryptr(process.env.SECRET_KEY);

const createUser = async (email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        throw {
            type: 'conflict',
            message: 'Email already taken',
        }
    }

    const hashedPassword = cryptr.encrypt(password);
    await userRepository.insert({
        email,
        password: hashedPassword,
    });
}

const login = async (email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw {
            type: 'not_found',
            message: 'User not found',
        }
    }

    const isValid = cryptr.decrypt(user.password) === password;
    if (!isValid) {
        throw {
            type: 'forbidden',
            message: 'Invalid password',
        }
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET);

    return { token };
}

export const authService = {
    createUser,
    login,
}