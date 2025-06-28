import React from 'react';
function Intro() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-4xl font-bold text-ilm-blue mb-4">Ilm Hub O'quv Markazi</h1>
        <p className="text-lg text-gray-700">Zamonaviy ta'lim kurslari bilan sizning kelajagingizni shakllantiramiz.</p>
      </div>
      <div className="md:w-1/2">
        <div className="bg-gray-300 h-64 rounded-lg"></div> {/* Placeholder rasm */}
      </div>
    </div>
  );
}

export default Intro;