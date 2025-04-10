"use client";
import { Container } from "../atoms/container";
import React from "react";
import { Brand } from "../molecules/Brand";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="sticky top-2 mb-8 z-10 w-11/12 px-4 h-12 border border-white/20 bg-white/30 backdrop-blur-md shadow-lg rounded-lg mx-auto items-center">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Brand />{" "}
          <div className="flex items-center">
            {isSignedIn ? <UserButton /> : <SignInButton />}
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  );
};
