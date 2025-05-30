"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-base-100 border-b border-gray-100 fixed z-20">
      <div className="navbar-start">
        <div className="dropdown">
          {/* Toggle dropdown visibility */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu border menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link href="/prideti-mokykla">Pridėti mokymo įstaigą</Link>
              </li>
              <li>
                <Link href="/perziureti-mokyklas">Peržiūrėti mokyklas</Link>
              </li>
              <li>
                <Link href={"/taisykles"}>Taisyklės</Link>
              </li>
              <li>
                <Link href={"/privatumo-politika"}>Privatumo politika</Link>
              </li>
            </ul>
          )}
        </div>
        <a href="/" className="text-xl font-bold lg:px-20">
          <img src="/images/manomokykla.png" alt="manomokyk.la" width={150} />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex z-[50]">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Mokyklos ir universitetai</summary>
              <ul className="p-2 border">
                <li>
                  <Link href="/prideti-mokykla">Pridėti</Link>
                </li>
                <li>
                  <Link prefetch href="/perziureti-mokyklas">
                    Peržiūrėti
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={"/taisykles"}>Taisyklės</Link>
          </li>
          <li>
            <Link href={"/privatumo-politika"}>Privatumo politika</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {status === "loading" ? (
          <a className=""></a>
        ) : status === "authenticated" ? (
          <a href="/skydelis" className="btn btn-outline btn-primary">
            Paskyra
          </a>
        ) : (
          <a href="/prisijungti" className="btn btn-outline btn-primary">
            Prisijungti
          </a>
        )}
      </div>
    </div>
  );
}

export default Nav;
