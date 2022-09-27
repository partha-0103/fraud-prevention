import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="nav">
      <ul>
        <Link href="/dashboard">
          <li
            className={
              router.pathname === "dashboard"
                ? "nav-link active-nav"
                : "nav-link"
            }
          >
            Dasshboard |
          </li>
        </Link>
        <Link href="/">
          <li
            className={
              router.pathname === "" ? "nav-link active-nav" : "nav-link"
            }
          >
            Settings |
          </li>
        </Link>
        <Link href="/payment-confirmation">
          <li
            className={
              router.pathname === "payment-confirmation"
                ? "nav-link active-nav"
                : "nav-link"
            }
          >
            Billing
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
