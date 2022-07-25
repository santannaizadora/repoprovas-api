-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherDisciplineId" INTEGER NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "terms_number_key" ON "terms"("number");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_name_key" ON "teachers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO terms ("number") VALUES (1);
INSERT INTO terms ("number") VALUES (2);
INSERT INTO terms ("number") VALUES (3);
INSERT INTO terms ("number") VALUES (4);
INSERT INTO terms ("number") VALUES (5);
INSERT INTO terms ("number") VALUES (6);

INSERT INTO categories ("name") VALUES ('Projeto');
INSERT INTO categories ("name") VALUES ('Prática');
INSERT INTO categories ("name") VALUES ('Recuperação');

INSERT INTO teachers ("name") VALUES ('Diego Pinho');
INSERT INTO teachers ("name") VALUES ('Bruna Hamori');

INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);
INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2);
INSERT INTO disciplines ("name", "termId") VALUES ('React', 3);
INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1);
INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2);
INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3);

INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3); 
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);