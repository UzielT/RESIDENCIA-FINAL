import { ReactElement } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/client";
interface Props {}

function Navbar({}: Props): ReactElement {
  const [session, loading] = useSession();

  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-row-reverse h-16 ml-auto">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-center justify-center space-x-4">
                    {navigation.map((item) =>
                      item.name === "Usuarios" ? (
                        /* @ts-ignore */
                        session.user?.role === "ADMIN" ? (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </a>
                        ) : null
                      ) : item.name === "Cerrar Sesion" ? (
                        <a
                          key={item.name}
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-white">
                        {/* @ts-ignore */}
                        {session?.user?.username}
                      </span>
                      {/* @ts-ignore */}
                      <span className="text-white">{session?.user?.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex -mr-2 md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) =>
                item.name === "Usuarios" ? (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : item.name === "Cerrar Sesion" ? (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000/" })
                    }
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                )
              )}
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              {/* @ts-ignore */}
              <span className="text-white">{session?.user?.username}</span>
              {/* @ts-ignore */}
              <span className="text-white">{session?.user?.role}</span>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

const navigation = [
  { name: "Cuentas", href: "/cuentas" },
  { name: "Paquetes", href: "/paquetes" },
  { name: "Usuarios", href: "/usuarios" },
  { name: "Cerrar Sesion" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
