import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
type typeObject = {
  id: number;
  precio: number;
  nombre: string;
  description: string;
  isActive: boolean;
};

interface Props {
  object: typeObject;
}

const ObjectCard = ({ object }: Props) => {
  const router = useRouter();
  const numberFormat = new Intl.NumberFormat("en");
  return (
    <div className="flex flex-col w-full gap-2 p-2 my-2 font-semibold text-white bg-white shadow-lg hover:bg-gray-200 ">
      <div className="flex flex-col items-start w-full space-y-2 text-black">
        <span className="w-full text-2xl font-bold text-center ">
          {object.nombre}
        </span>
        <span className="text-lg font-semibold">
          Precio: {numberFormat.format(object.precio)} Pesos
        </span>
        <span className="text-base text-gray-700 whitespace-pre">
          {object.description}
        </span>
      </div>
      <button
        onClick={() => eliminarObjeto(object.id, router)}
        className={
          object.isActive == true
            ? "bg-green-600 text-center mt-auto"
            : "bg-red-600 mt-auto"
        }
      >
        {object.isActive == true ? "Activo" : "Desactivado"}
      </button>
    </div>
  );
};

export default ObjectCard;

const eliminarObjeto = async (id: any, router: any) => {
  axios
    .put("/api/deleteObject", {
      data: id,
    })
    .then(function (response: any) {
      router.reload(window.location.pathname);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
