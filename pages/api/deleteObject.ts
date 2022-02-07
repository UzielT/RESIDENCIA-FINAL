import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    const objectExists = await prisma.objeto.findFirst({
      where: {
        id: req.body.data,
      },
    });

    if (!objectExists) {
      throw new Error("Objeto no encontrado");
    }

    const activo: any = parseInt(objectExists.isActive) >= 1 ? "0" : "1";

    await prisma.objeto.update({
      where: {
        id: objectExists.id,
      },
      data: {
        isActive: activo,
      },
    });

    return res.json({ msg: "Objeto Modificado" });
  } catch (error) {
    throw error;
  }
}
