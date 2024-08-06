import { Container } from "../atoms/container";
import React from "react";
import { Brand } from "../molecules/Brand";
import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  return (
    <nav className="sticky top-2 w-full h-12 border-2 border-white border-y bg-white/40">
      <Container>
        <div className="flex items-center justify-between">
          <Brand />{" "}
          <div className="flex items-center">
            <UserButton />
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  );
};
