import React from "react";
import UserAddressCard from "./UserAddressCard";

const Address = () => {
  return (
    <div className="space-y-3">
      {[...Array(10)].map((item, index) => (
        <UserAddressCard />
      ))}
    </div>
  );
};

export default Address;
