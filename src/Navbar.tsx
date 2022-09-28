import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div className="nav">
      <Link href="/">
        <div
          className={
            router.pathname === "/" ? "nav-item active-nav" : "nav-item"
          }
        >
          Settings |
        </div>
      </Link>
      <Link href="/payment-confirmation">
        <div
          className={
            router.pathname === "/payment-confirmation"
              ? "nav-item active-nav"
              : "nav-item"
          }
        >
          Billing |
        </div>
      </Link>
      <Link href="/dashboard">
        <div
          className={
            router.pathname === "/dashboard"
              ? "nav-item active-nav"
              : "nav-item"
          }
        >
          Dashboard
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
