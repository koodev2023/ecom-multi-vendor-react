import { Radio } from "@mui/material";
import { ChangeEvent } from "react";
import { Address } from "../../../api/generated-fetch";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (addressId: number | undefined) => void;
}

const AddressCard = ({
  address,
  isSelected = false,
  onSelect,
}: AddressCardProps) => {
  const getFullAddressString = (addr: Address): string => {
    const parts = [addr.address, addr.locality, addr.city, addr.state].filter(
      (part) => part
    );

    let displayAddress = parts.join(", ");

    if (addr.pinCode) {
      if (displayAddress) {
        displayAddress += ` - ${addr.pinCode}`;
      } else {
        displayAddress = addr.pinCode;
      }
    }
    return displayAddress || "Address details missing";
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    _checked: boolean
  ): void {
    console.log(
      `Radio clicked for address ID: ${address.id}, New checked state: ${event.target.checked}`
    );
    if (onSelect) {
      onSelect(address.id);
    }
  }

  return (
    <div className="p-5 border rounded-md flex items-start gap-4">
      <div>
        <Radio
          checked={isSelected}
          onChange={handleChange}
          value={String(address.id ?? "")}
          name="addressSelection"
          inputProps={{
            "aria-label": `Select address ${address.name ?? address.id}`,
          }}
        />
      </div>

      <div className="space-y-1 pt-1">
        <h1 className="font-semibold">{address.name ?? "Unnamed Address"}</h1>

        <p className="w-full text-sm text-gray-700">
          {getFullAddressString(address)}
        </p>

        {address.mobile && (
          <p className="text-sm text-gray-700">
            <strong>Mobile: </strong>
            {address.mobile}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
