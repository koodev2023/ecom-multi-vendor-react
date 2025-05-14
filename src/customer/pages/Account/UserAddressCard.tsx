import { Radio } from "@mui/material";
import React from "react";

const UserAddressCard = () => {
  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio checked onChange={() => {}} />
      </div>

      <div className="space-y-3">
        <h1>Mark</h1>
        <p className="w-80">AAAA, BBBB, CCCC, DDDD - 123456</p>
        <p>
          <strong>Mobile: </strong>
          91230123
        </p>
      </div>
    </div>
  );
};

export default UserAddressCard;
