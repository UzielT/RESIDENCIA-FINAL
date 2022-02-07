import React, { ReactElement, useState } from "react";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import uniqid from "uniqid";

function CrearCuenta({ objetos }: any): ReactElement {
  const [session, loading] = useSession();
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);
  const [precio, setPrecio] = useState(0);

  function agregarProducto(producto: any) {
    const UID = uniqid();
    const newProduct = { UID, producto };
    /* @ts-ignore */
    setCarrito([...carrito, newProduct]);
    setPrecio(precio + producto.precio);
  }

  const numberFormat = new Intl.NumberFormat("en");

  function eliminarProducto(objeto: any) {
    setCarrito(carrito.filter((objet: any) => objet.UID !== objeto.UID));
    setPrecio(precio - objeto.producto.precio);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    crearCuenta({ data, carrito, precio }, router);
  };

  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="grid items-center justify-center w-full grid-cols-1">
            <h1 className="w-full text-5xl font-bold text-center text-black ">
              Crear Cuenta
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-4 p-4 my-8 text-xl shadow-md md:grid-cols-2 "
          >
            <div className="grid w-full grid-cols-1 gap-2">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Empleado Encargado: </label>
                <input
                  /* @ts-ignore */
                  value={session?.user?.username || "No tiene nombre"}
                  placeholder="Empleado"
                  type="text"
                  readOnly
                  {...register("nombreEmpleado", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Nombre del Cliente: </label>
                <input
                  placeholder="Nombre del Cliente"
                  type="text"
                  {...register("nombreCliente", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Dirección: </label>
                <input
                  placeholder="Dirección del Cliente"
                  type="text"
                  {...register("direccionCliente", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Número: </label>
                <input
                  placeholder="Número del Cliente"
                  type="text"
                  {...register("numeroCliente", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Fecha: </label>
                <input
                  type="datetime-local"
                  {...register("fecha", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Precio Total: </label>

                <span className="p-1">$ {numberFormat.format(precio)}</span>
              </div>

              <button
                className="p-2 font-semibold text-white bg-blue-600"
                type="submit"
              >
                Crear Cuenta
              </button>
            </div>
            <div className="grid w-full grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-1">
                <h1 className="text-2xl font-semibold">Productos</h1>
                <div className="grid justify-center w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {objetos.map((objeto: any, key: any) => (
                    <div
                      key={key}
                      className="flex flex-col items-center justify-center p-1 text-center border-2 border-black border-solid cursor-pointer hover:bg-green-300"
                      onClick={() => agregarProducto(objeto)}
                    >
                      <span>{objeto.nombre}</span>
                      <span>$ {numberFormat.format(objeto.precio)} Pesos</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <h1 className="text-2xl font-semibold">Carrito</h1>
                <div className="grid justify-center w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {carrito.map((objeto: any) => (
                    <div
                      key={objeto.UID}
                      className="flex flex-col items-center justify-center p-1 text-center border-2 border-black border-solid cursor-pointer hover:bg-red-300 "
                      onClick={() => eliminarProducto(objeto)}
                    >
                      <span>{objeto.producto.nombre}</span>
                      <span>{objeto.producto.precio} Pesos</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <div>
      <h1>Sesion No Iniciada</h1>
    </div>
  );
}

export default CrearCuenta;

export const getServerSideProps = async () => {
  const objetos = await prisma.objeto.findMany({
    where: {
      isActive: "1",
    },
  });
  return { props: { objetos } };
};

const crearCuenta = async (data: any, router: any) => {
  axios
    .post("/api/postAccount", {
      data: data,
    })
    .then(function (response: any) {
      router.push("/cuentas");
    })
    .catch(function (error: any) {
      alert("Ya hay una cuenta con los mismos datos");
    });
};
