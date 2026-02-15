"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

interface DashboardCardProps {
  cta: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function WebsiteDialog({
  cta,
  title,
  description,
  children,
}: DashboardCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{cta}</DialogTrigger>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
