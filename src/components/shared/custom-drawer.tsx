import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/atoms/drawer";
import { Button } from "@/components/atoms/button";

interface CustomDrawerProps {
  triggerLabel: string; // Label untuk tombol trigger Drawer
  title: string; // Judul Drawer
  description?: string; // Deskripsi Drawer
  footer?: React.ReactNode; // Konten untuk footer Drawer
  children: React.ReactNode; // Konten utama Drawer
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  triggerLabel,
  title,
  description,
  footer,
  children,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div>{children}</div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
