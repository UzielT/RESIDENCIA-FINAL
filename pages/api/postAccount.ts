import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import _ from "lodash";

export default async function handle(req: any, res: any) {
  const { data, carrito, precio } = req.body.data;
  const formatDate = new Date(data.fecha);
  const formatCarrito = carrito.map((item: any) => {
    return item.producto;
  });

  const countCarrito = _(formatCarrito)
    .groupBy("id")
    .map(function (items, id) {
      return {
        id: parseInt(id),
        count: items.length,
        price: items[0].precio,
      };
    })
    .value();

  const newFormatCarrito = countCarrito.map((item: any) => {
    return {
      cantidad: item.count,
      precioTotal: item.price * item.count,
      objeto: { connect: { id: item.id } },
    };
  });
  try {
    await prisma.cuenta.create({
      data: {
        nombreCliente: data.nombreCliente,
        nombreEmpleado: data.nombreEmpleado,
        celular: data.numeroCliente,
        direccion: data.direccionCliente,
        fecha: formatDate,
        precioFinal: precio,
        objetos: {
          create: newFormatCarrito,
        },
      },
    });
    return res.json({ msg: "Cuenta creada" });
  } catch (error) {
    throw error;
  }
}
