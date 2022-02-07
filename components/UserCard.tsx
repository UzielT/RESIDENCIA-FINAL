import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type typeUser = {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  role: string;
};

interface Props {
  user: typeUser;
}

const UserCard = ({ user }: Props) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-2 p-2 my-2 text-xl font-semibold text-center text-white bg-black md:grid-cols-5 bg-opacity-70">
      <span>{user.username}</span>
      <span>{user.email}</span>

      <span>{user.role}</span>
      <Link href={`/usuarios/modificar/${user.id}`} passHref>
        <button className="bg-blue-600">Modificar</button>
      </Link>
      <button
        className="bg-red-600"
        onClick={() => eliminarUsuario(user.email, router)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default UserCard;

const eliminarUsuario = async (email: any, router: any) => {
  axios
    .delete("/api/deleteUser", {
      data: email,
    })
    .then(function (response: any) {
      router.reload(window.location.pathname);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
