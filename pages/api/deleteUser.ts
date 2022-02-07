import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    await prisma.usuario.delete({
      where: {
        email: req.body,
      },
    });
    res.json({ msg: "Usuario Eliminado" });
  } catch (error) {
    res.json({ msg: "Ha ocurrido un error" });
  }
}
