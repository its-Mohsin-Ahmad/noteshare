import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PDFPreviewModal } from '../common/PDFPreviewModal';
import { Toast } from '../common/Toast';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
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
