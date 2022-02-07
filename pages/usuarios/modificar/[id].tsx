import React, { ReactElement } from "react";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

function ModificarUsuario({ usuario }: any): ReactElement {
  const [session, loading] = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    modificarUsuario(data, router, usuario.id);
  };

  if (session) {
    return (
      <>
        <Navbar />
        <Head>
          <title>Modificar Usuario</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="grid items-center justify-center w-full grid-cols-1">
            <h1 className="w-full text-5xl font-bold text-center text-black ">
              Modificar Usuario
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-6xl p-4 my-8 space-y-5 text-xl shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Nombre: </label>
              <input
                type="text"
                placeholder={usuario.username}
                {...register("nombre")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Correo: </label>
              <input
                type="email"
                placeholder={usuario.email}
                {...register("correo")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Contraseña: </label>
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Tipo de Usuario: </label>
              <select placeholder={usuario.role} {...register("rol")}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button
              className="p-2 font-semibold text-white bg-blue-600"
              type="submit"
            >
              Modificar Usuario
            </button>
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

export default ModificarUsuario;

const prisma = new PrismaClient();

export const getServerSideProps = async ({ params }: any) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return { props: { usuario } };
};

const modificarUsuario = async (data: any, router: any, id: number) => {
  axios
    .put("/api/putUser", {
      data: { id, data },
    })
    .then(function (response: any) {
      router.push("/usuarios");
    })
    .catch(function (error: any) {
      alert("Ya hay un usuario con los mismos datos");
    });
};
