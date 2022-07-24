import app from "../src/app.js";
import supertest from 'supertest';
import { client } from "../src/config/database.js";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
    await client.$disconnect();
});

describe("POST /auth/logon", () => {
    it("given an valid user it should return 201", async () => {
        const body = {
            email: "teste@teste.com",
            password: "senhasupersecreta"
        };
        const result = await supertest(app).post("/auth/logon").send(body);
        const status = result.status;
        expect(status).toEqual(201)
    })

    it("given an invalid user it should return 422", async () => {
        const body = {};
        const result = await supertest(app).post("/auth/logon").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })

    it("given an user that already exists it should return 409", async () => {
        const body = {
            email: "teste@teste.com",
            password: "senhasupersecreta"
        };
        await supertest(app).post("/auth/logon").send(body);
        const result = await supertest(app).post("/auth/logon").send(body);
        const status = result.status;
        expect(status).toEqual(409)
    })
})

describe("POST /auth/login", () => {
    it("given an empty body it should return 422", async () => {
        const body = {};
        const result = await supertest(app).post("/auth/login").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })

    it("given an user that does not exist, it shuld return 404", async () => {
        const body = {
            email: "a@teste.com",
            password: "senhasupersecreta"
        };
        const result = await supertest(app).post("/auth/login").send(body);
        const status = result.status;
        expect(status).toEqual(404)
    })
})