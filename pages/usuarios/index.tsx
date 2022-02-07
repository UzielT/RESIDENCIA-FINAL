import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import UserCard from "../../components/UserCard";
import Link from "next/link";
import Head from "next/head";

const prisma = new PrismaClient();
interface Props {
  users: any;
}

function Usuarios({ users }: Props): ReactElement {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        <Navbar />
        <Head>
          <title>Panel De Usuarios</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="grid items-center justify-center w-full grid-cols-1 gap-4">
            <Link href="/usuarios/crear" passHref>
              <button className="p-2 ml-auto font-semibold text-white bg-blue-600 w-36">
                Crear Usuario
              </button>
            </Link>
            <h1 className="w-full text-4xl font-bold text-center text-black md:text-5xl ">
              Usuarios
            </h1>
          </div>
          <div className="w-full my-10 max-w-7xl">
            {users.map((user: any, index: any) => (
              <UserCard user={user} key={index} />
            ))}
          </div>
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

export default Usuarios;

export const getServerSideProps = async () => {
  const users = await prisma.usuario.findMany();
  return { props: { users } };
};
