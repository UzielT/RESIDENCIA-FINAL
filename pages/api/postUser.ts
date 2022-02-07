import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    await prisma.usuario.create({
      data: {
        username: req.body.data.nombre,
        email: req.body.data.correo,
        password: req.body.data.password,
        role: req.body.data.rol,
      },
    });
    return res.json({ msg: "Usuario creado" });
  } catch (error) {
    throw error;
  }
}
