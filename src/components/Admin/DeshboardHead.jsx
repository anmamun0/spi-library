import React from 'react';

const DeshboardHead = ({ icon: Icon, heading, subheading }) => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4">
        <div className="flex items-center gap-4 ">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            {/* Render the passed icon component */}
            {Icon && <Icon size={28} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{heading}</h1>
            {subheading && <p className="text-sm text-gray-500">{subheading}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeshboardHead;
