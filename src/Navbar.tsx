import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link href="/dashboard">
          <a>
            <li>Dasshboard</li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>Settings</li>
          </a>
        </Link>
        <Link href="/blog">
          <a>
            <li>Billing</li>
          </a>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
