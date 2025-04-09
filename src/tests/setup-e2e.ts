import "dotenv/config";
import { afterAll, beforeEach } from "vitest";
import { prisma } from "../lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
