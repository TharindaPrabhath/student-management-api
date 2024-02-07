import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const PORT = process.env.PORT;

const db = new PrismaClient();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/status", (req: Request, res: Response) => {
  res.send("Up & Running...");
});

// Auth API
app.get("/api/auth/login", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await db.user.findFirst({
    where: {
      email: body?.email,
      password: body?.password,
    },
  });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json(user);
});

// Students API
app.get("/api/students/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = await db.student.findFirst({ where: { id } });
  res.json(student);
});

app.get("/api/students", async (req: Request, res: Response) => {
  const students = await db.student.findMany();
  res.json(students);
});

app.post("/api/students", async (req: Request, res: Response) => {
  const body = req.body;
  const student = await db.student.create({
    data: {
      firstName: body?.firstName,
      lastName: body?.lastName,
      address: body?.address,
      phone: body?.phone,
      birthday: body?.birthday,
      teachers: { connect: { id: Number(body?.teacherId) } },
      classes: { connect: { id: Number(body?.classId) } },
    },
  });
  res.json(student);
});

app.patch("/api/students/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  const student = await db.student.update({
    where: { id },
    data: body,
  });
  res.json(student);
});

app.delete("/api/students/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await db.student.delete({
    where: { id },
  });
  res.send();
});

// Teachers API
app.get("/api/teachers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const teacher = await db.teacher.findFirst({ where: { id } });
  res.json(teacher);
});

app.get("/api/teachers", async (req: Request, res: Response) => {
  const teachers = await db.teacher.findMany();
  res.json(teachers);
});

app.post("/api/teachers", async (req: Request, res: Response) => {
  const body = req.body;
  const teacher = await db.teacher.create({
    data: {
      firstName: body?.firstName,
      lastName: body?.lastName,
      address: body?.address,
      phone: body?.phone,
      birthday: body?.birthday,
      // classes: { connect: { id: Number(body?.classId) } },
    },
  });
  res.json(teacher);
});

app.patch("/api/teachers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  const teacher = await db.teacher.update({
    where: { id },
    data: body,
  });
  res.json(teacher);
});

app.delete("/api/teachers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await db.teacher.delete({
    where: { id },
  });
  res.send();
});

// Classes API
app.get("/api/classes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const _class = await db.class.findFirst({ where: { id } });
  res.json(_class);
});

app.get("/api/classes", async (req: Request, res: Response) => {
  const _classs = await db.class.findMany();
  res.json(_classs);
});

app.post("/api/classes", async (req: Request, res: Response) => {
  const body = req.body;
  const _class = await db.class.create({
    data: {
      name: body?.name,
      lectureHall: body?.lectureHall,
      teacher: { connect: { id: Number(body?.teacherId) } },
    },
  });
  res.json(_class);
});

app.patch("/api/classes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  const _class = await db.class.update({
    where: { id },
    data: body,
  });
  res.json(_class);
});

app.delete("/api/classes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await db.class.delete({
    where: { id },
  });
  res.send();
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
