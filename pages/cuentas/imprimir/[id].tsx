import React, { ReactElement, useRef, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useReactToPrint } from "react-to-print";
import { DateTime } from "luxon";
interface Props {
  cuenta: any;
}

function FichaTecnica({ cuenta }: Props): ReactElement {
  const dt = DateTime.fromJSDate(cuenta.fecha);
  const dtCreado = DateTime.fromJSDate(cuenta.registeredAt);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    // @ts-ignore */}
    content: () => componentRef.current,
  });

  useEffect(() => {
    // @ts-ignore */}
    handlePrint();
  });
  const numberFormat = new Intl.NumberFormat("en");
  return (
    <>
      <button onClick={handlePrint}>Imprimir</button>

      <div
        // @ts-ignore */}
        ref={componentRef}
        className="flex flex-col items-center w-full max-w-5xl shadow-sm print:my-0"
      >
        <div className="flex flex-col items-center w-full min-h-screen bg-white shadow-md p-14">
          <div className="flex flex-col space-y-4 w-full h-[600px]  p-8 border-2 border-black border-solid ">
            <h1 className="text-4xl font-bold text-center uppercase">Pampas</h1>
            <span className="ml-auto text-lg font-bold">
              Cliente: {cuenta.nombreCliente}
            </span>
            <span className="ml-auto text-lg font-bold">
              Número: {cuenta.celular}
            </span>
            <span className="mr-auto text-lg font-bold">
              Dirección: {cuenta.direccion}
            </span>
            <div className="flex flex-col items-center justify-center text-base text-black">
              <span className="text-xl font-bold"> Reservación el</span>
              <span className="text-lg font-semibold">
                {dt.day}/{dt.month}/{dt.year} a las {dt.hour}:{dt.minute} Horas
              </span>
            </div>
            <div className="grid w-full grid-cols-1 p-2">
              <h1 className="text-xl font-bold">Compra</h1>
              <div className="grid grid-cols-1 gap-2">
                {cuenta.objetos.map((objeto: any, index: any) => (
                  <div
                    className="flex flex-row justify-start space-x-1 "
                    key={index}
                  >
                    <div className="flex items-center justify-center w-full">
                      {objeto.cantidad}x
                    </div>
                    <div className="flex items-center justify-center w-full">
                      {objeto.objeto.nombre}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      $ {numberFormat.format(objeto.precioTotal)} MXN
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="ml-auto text-lg font-semibold">
              Total: {numberFormat.format(cuenta.precioFinal)} MXN
            </span>

            <div className="mt-auto text-base text-gray-700">
              Creado el: {dtCreado.day}/{dtCreado.month}/{dtCreado.year} a las{" "}
              {dtCreado.hour}:{dtCreado.minute} Horas
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FichaTecnica;

export const getServerSideProps = async ({ params }: any) => {
  const cuenta = await prisma.cuenta.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      objetos: {
        include: {
          objeto: {
            select: {
              nombre: true,
            },
          },
        },
      },
    },
  });

  return { props: { cuenta } };
};
