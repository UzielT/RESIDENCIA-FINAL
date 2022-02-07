import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    await prisma.objeto.create({
      data: {
        precio: parseInt(req.body.data.precio),
        nombre: req.body.data.nombre,
        description: req.body.data.description,
      },
    });
    return res.json({ msg: "Objeto creado" });
  } catch (error) {
    throw error;
  }
}
