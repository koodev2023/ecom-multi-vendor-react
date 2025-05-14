import React from "react";

const CategoryGrid = () => {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-span-3 row-span-12 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://plus.unsplash.com/premium_photo-1673125510222-1a51e3a8ccb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
