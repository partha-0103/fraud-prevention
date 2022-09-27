import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <div className="nav">
      <ul>
        <Link href="/dashboard">
          <a
            className={
              router.pathname === "dashboard"
                ? "nav-link active-nav"
                : "nav-link"
            }
          >
            <li>Dasshboard</li>
          </a>
        </Link>
        <Link href="/">
          <a
            className={
              router.pathname === "" ? "nav-link active-nav" : "nav-link"
            }
          >
            <li>Settings</li>
          </a>
        </Link>
        <Link href="/payment-confirmation">
          <a
            className={
              router.pathname === "payment-confirmation"
                ? "nav-link active-nav"
                : "nav-link"
            }
          >
            <li>Billing</li>
          </a>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
