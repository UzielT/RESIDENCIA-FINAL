import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    const userExists = await prisma.usuario.findFirst({
      where: {
        id: req.body.data.id,
      },
    });

    if (!userExists) {
      throw new Error("Usuário no encontrado");
    }
    await prisma.usuario.update({
      where: {
        id: req.body.data.id,
      },
      data: {
        username: req.body.data.data.nombre || userExists.username,
        email: req.body.data.data.correo || userExists.email,
        password: req.body.data.data.password || userExists.password,
        role: req.body.data.data.rol || userExists.role,
      },
    });
    return res.json({ msg: "Usuario Modificado" });
  } catch (error) {
    throw error;
  }
}
