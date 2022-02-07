import React, { ReactElement, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import AccountCard from "../../components/AccountCard";

const prisma = new PrismaClient();
interface Props {
  cuentas: any;
}

function Usuarios({ cuentas }: Props): ReactElement {
  const [session, loading] = useSession();
  const [filter, setFilter] = useState("");

  if (session) {
    return (
      <>
        <Navbar />

        <div className="flex flex-col items-center justify-center w-full p-4 space-y-4">
          <div className="grid items-center justify-center w-full grid-cols-1 gap-4">
            <h1 className="w-full mb-2 text-4xl font-bold text-center text-black md:text-5xl ">
              Cuentas
            </h1>
            <div className="flex flex-row flex-wrap">
              <div className="w-56 mb-4 ">
                <input
                  type="search"
                  placeholder="Buscador"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="w-full max-w-lg p-2 text-lg border-2 border-gray-400 border-solid"
                />
              </div>
              <Link href="/cuentas/crear" passHref>
                <button className="p-2 ml-auto font-semibold text-white bg-blue-600 w-36">
                  Crear Cuenta
                </button>
              </Link>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 my-2 md:grid-cols-2 lg:grid-cols-5 ">
            {cuentas
              .filter(
                (f: any) =>
                  f.nombreCliente
                    .toUpperCase()
                    .includes(filter.toUpperCase()) || filter === ""
              )
              .map((cuenta: any, index: any) => (
                <AccountCard key={index} account={cuenta} />
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
  const cuentas = await prisma.cuenta.findMany();
  return { props: { cuentas } };
};
