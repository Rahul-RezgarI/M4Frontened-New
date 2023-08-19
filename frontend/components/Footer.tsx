import React from "react";

export default function Footer() {
  return (
    <div className="min-w-max overflow-hidden">
      <div className="bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-8">
          <div className="text-center">
            &copy; {new Date().getFullYear()}. RAZERPAY, All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
