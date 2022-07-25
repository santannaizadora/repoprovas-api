import app from "../src/app.js";
import supertest from "supertest";
import { client } from "../src/config/database.js";
import { userBody } from "./userBody.js";
import "../src/setup.js";

beforeEach(async () => {
	await client.$executeRaw`TRUNCATE TABLE tests;`;
});

afterAll(async () => {
	await client.$disconnect();
});

describe("POST /test/new", () => {
	it("no Authorization header it should return 401", async () => {
		const result = await supertest(app).post("/test/new");
		const status = result.status;
		expect(status).toEqual(401);
	});
	it("given an invalid token it should return 403", async () => {
		const result = await supertest(app)
			.post("/test/new")
			.set("Authorization", "Bearer invalidtoken");
		const status = result.status;
		expect(status).toEqual(403);
	});
	it("given an valid token and valid body it should return 201", async () => {
		await supertest(app).post("/auth/logon").send(userBody);
		const token = await supertest(app).post("/auth/login").send(userBody);
		const result = await supertest(app)
			.post("/test/new")
			.set("Authorization", "Bearer " + token.body.token)
			.send({
				name: "name",
				pdfUrl: "https://github.com/santannaizadora/repoprovas-api",
				categoryId: 3,
				teacherDisciplineId: 5,
			});
		const status = result.status;
		expect(status).toEqual(201);
	});
	it("given an valid token and invalid body it should return 422", async () => {
		await supertest(app).post("/auth/logon").send(userBody);
		const token = await supertest(app).post("/auth/login").send(userBody);
		const result = await supertest(app)
			.post("/test/new")
			.set("Authorization", "Bearer " + token.body.token)
			.send({
				name: "name",
				pdfUrl: "invalidurl",
				categoryId: 3,
				teacherDisciplineId: 5,
			});
		const status = result.status;
		expect(status).toEqual(422);
	});
  it("given an valid token and body with invalid category it should return 404", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
		const token = await supertest(app).post("/auth/login").send(userBody);
		const result = await supertest(app)
			.post("/test/new")
			.set("Authorization", "Bearer " + token.body.token)
			.send({
				name: "name",
				pdfUrl: "https://github.com/santannaizadora/repoprovas-api",
				categoryId: -5,
				teacherDisciplineId: 5,
			});
		const status = result.status;
		expect(status).toEqual(404);
  })
  it("given an valid token and body with invalid teacher discipline it should return 404", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
		const token = await supertest(app).post("/auth/login").send(userBody);
		const result = await supertest(app)
			.post("/test/new")
			.set("Authorization", "Bearer " + token.body.token)
			.send({
				name: "name",
				pdfUrl: "https://github.com/santannaizadora/repoprovas-api",
				categoryId: 1,
				teacherDisciplineId: -5,
			});
		const status = result.status;
		expect(status).toEqual(404);
  })
});

describe("GET /test/all", () => {
  it("given an valid token it should return 200", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
    const token = await supertest(app).post("/auth/login").send(userBody);
    const result = await supertest(app)
      .get("/test/all")
      .set("Authorization", "Bearer " + token.body.token);
    const status = result.status;
    expect(status).toEqual(200);
  })
  it("given an valid token it should return an array", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
    const token = await supertest(app).post("/auth/login").send(userBody);
    const result = await supertest(app)
      .get("/test/all")
      .set("Authorization", "Bearer " + token.body.token);
    const status = result.status;
    expect(Array.isArray(result.body)).toBe(true);
  })
});

describe("GET /test/teachers", () => {
  it("given an valid token it should return 200", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
    const token = await supertest(app).post("/auth/login").send(userBody);
    const result = await supertest(app)
      .get("/test/teachers")
      .set("Authorization", "Bearer " + token.body.token);
    const status = result.status;
    expect(status).toEqual(200);
  })
  it("given an valid token it should return an array", async () => {
    await supertest(app).post("/auth/logon").send(userBody);
    const token = await supertest(app).post("/auth/login").send(userBody);
    const result = await supertest(app)
      .get("/test/teachers")
      .set("Authorization", "Bearer " + token.body.token);
    const status = result.status;
    expect(Array.isArray(result.body)).toBe(true);
  })
});