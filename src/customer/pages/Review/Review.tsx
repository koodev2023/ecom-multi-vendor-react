import React from "react";
import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex-col flex lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-1/3 space-y-2">
        <img
          src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div>
          <div>
            <p className="font-bold text-xl">Men Clothing</p>
            <p className="text-lg text-gray-600">Men's White Shirt</p>
          </div>

          <div>
            <div className="mt-5 flex items-center">
              <span className="text-sm font-medium text-gray-800">$50</span>
              <span className="ml-2 text-xs line-through text-gray-500">
                $75
              </span>
              <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                33% off
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {[...Array(10)].map((_, index) => (
          <div className="space-y-3">
            <ReviewCard key={index} />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;
