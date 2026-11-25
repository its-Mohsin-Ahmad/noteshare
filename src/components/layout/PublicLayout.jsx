import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PDFPreviewModal } from '../common/PDFPreviewModal';
import { Toast } from '../common/Toast';

export const PublicLayout = () => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <PDFPreviewModal />
      <Toast />
    </div>
  );
};
