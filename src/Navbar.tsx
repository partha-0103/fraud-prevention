import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="nav">
      <ul>
        <Link href="/dashboard">
          <a className="nav-link">
            <li>Dasshboard</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-link">
            <li>Settings</li>
          </a>
        </Link>
        <Link href="/blog">
          <a className="nav-link">
            <li>Billing</li>
          </a>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
