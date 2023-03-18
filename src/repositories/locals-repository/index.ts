import { prisma } from "@/config";

async function getAllLocals() {
  return prisma.local.findMany({})
}

export default {
  getAllLocals,
};