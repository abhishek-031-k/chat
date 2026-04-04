import React from "react";

function ImageModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    // The dark background overlay
    <div 
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose} // Clicking anywhere in the dark area closes it
    >
      
      {/* THE "CUT" / CLOSE BUTTON */}
      {/* fixed top-6 right-6 ensures it is ALWAYS safely on the screen */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 transition-colors shadow-lg"
      >
        {/* The "X" Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* The Image Container */}
      <div 
        className="relative max-w-3xl w-full flex justify-center cursor-auto"
        onClick={(e) => e.stopPropagation()} // Clicking the image itself does nothing
      >
        <img 
          src={imageUrl} 
          alt="Full size profile" 
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </div>
      
    </div>
  );
}

export default ImageModal;
