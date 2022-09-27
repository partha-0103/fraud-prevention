import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="nav">
      <Link href="/dashboard">
        <div
          className={
            router.pathname === "dashboard" ? "nav-link active-nav" : "nav-link"
          }
        >
          Dasshboard |
        </div>
      </Link>
      <Link href="/">
        <div
          className={
            router.pathname === "" ? "nav-link active-nav" : "nav-link"
          }
        >
          Settings |
        </div>
      </Link>
      <Link href="/payment-confirmation">
        <div
          className={
            router.pathname === "payment-confirmation"
              ? "nav-link active-nav"
              : "nav-link"
          }
        >
          Billing
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
