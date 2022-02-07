import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ObjectCard from "../../components/ObjectCard";
import Head from "next/head";
import _ from "lodash";
const prisma = new PrismaClient();
interface Props {
  objetos: any;
}

function Objetos({ objetos }: Props): ReactElement {
  const [session, loading] = useSession();
  const objetosOrdenados = _.orderBy(objetos, ["isActive"], ["desc"]);
  console.log(objetosOrdenados);
  if (session) {
    return (
      <>
        <Navbar />
        <Head>
          <title>Panel de Paquetes</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="grid items-center justify-center w-full grid-cols-1 gap-4">
            <Link href="/paquetes/crear" passHref>
              <button className="p-2 ml-auto font-semibold text-white bg-blue-600 w-36">
                Crear Paquete
              </button>
            </Link>
            <h1 className="w-full text-4xl font-bold text-center text-black md:text-5xl ">
              Paquetes
            </h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 p-4 my-2 md:grid-cols-3 lg:grid-cols-5">
            {objetosOrdenados.map((objeto: any) => (
              <ObjectCard key={objeto.id} object={objeto} />
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

export default Objetos;

export const getServerSideProps = async () => {
  const objetos = await prisma.objeto.findMany();
  return { props: { objetos } };
};
