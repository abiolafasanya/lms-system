'use client';
import React, { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const Modal = ({
  children,
  isOpen,
  toggle,
  title,
}: {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  title?: string;
}) => {
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={toggle}>
      <DialogContent className="mx-auto">
        <DialogHeader>
          <DialogTitle className="">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
