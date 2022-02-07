import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    const objectExists = await prisma.objeto.findFirst({
      where: {
        id: req.body.data.id,
      },
    });

    if (!objectExists) {
      throw new Error("Objeto no encontrado");
    }

    await prisma.objeto.update({
      where: {
        id: req.body.data.id,
      },
      data: {
        precio: parseInt(req.body.data.data.precio) || objectExists.precio,
        nombre: req.body.data.data.nombre || objectExists.nombre,
        description: req.body.data.data.description || objectExists.description,
      },
    });

    return res.json({ msg: "Objeto Modificado" });
  } catch (error) {
    throw error;
  }
}
