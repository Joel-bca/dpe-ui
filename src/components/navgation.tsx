"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import link from "next/link";

export function Nav() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Committee", link: "/committee" },
    { name: "Contact", link: "/footer" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* ======= NAVBAR ======= */}
      <Navbar className="fixed top-0 left-0 w-full bg-transparent">
        <NavBody>
          <div className="navbar-logo">
            <i>DPE | BYC</i>
          </div>
          <NavItems
            items={navItems.map((item) => ({
              ...item,
              className:
                "text-gray-200 hover:text-white transition-colors duration-200",
            }))}
          />
        </NavBody>

        {/* ======= MOBILE NAVBAR ======= */}
        <MobileNav>
          <MobileNavHeader>
            <div className="navbar-logo">
              <span className="text-white font-bold text-lg">
                
              </span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-gray-200 hover:text-white py-2 text-lg"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}