import React from "react";

const Modal = () => {
  return (
    <div className="h-screen w-screen backdrop-blur-sm absolute top-0 left-0 z-50">
      <div className="h-screen flex justify-center items-center">
        <div className="h-3/4 w-1/4 bg-white rounded-3xl px-10 py-5">Hello</div>
      </div>
    </div>
  );
};

export default Modal;
