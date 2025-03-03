
import React from 'react';
import GalleryHeader from '@/components/Gallery/GalleryHeader';
import GalleryContainer from '@/components/Gallery/GalleryContainer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GalleryCom = () => {
  return (

    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-background">
        <Navbar/>
      <GalleryHeader />
      <div className="w-full max-w-[1600px] px-4 pb-16">
        <GalleryContainer />
      </div>
      
      <footer className="w-full py-8 px-4 mt-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-100 mb-3">Experience the depth and beauty of Sri Lanka</p>
          <p className="text-blue-100 text-sm">&copy; {new Date().getFullYear()} CheapChaser Collection</p>
        </div>
      </footer>
      <Footer/>
    </main>
  );
};

export default GalleryCom;
