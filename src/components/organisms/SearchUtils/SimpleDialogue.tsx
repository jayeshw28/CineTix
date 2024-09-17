import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import React, { useState } from "react";

interface SimpleDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}
export const SimpleDialog = ({
  open,
  setOpen,
  title,
  children,
}: SimpleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hidden">
          {/* Hidden trigger - we'll likely manage opening elsewhere */}
        </button>
      </DialogTrigger>
      <DialogContent
        className={
          "lg:max-w-screen-lg overflow-y-scroll scrollbar-hide max-h-screen"
        }
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
