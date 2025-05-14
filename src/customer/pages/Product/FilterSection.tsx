import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState } from "react";
import { colors } from "../../../data/filter/color";
import { discounts } from "../../../data/filter/discount";
import { prices } from "../../../data/filter/price";
import { useSearchParams } from "react-router-dom";

const FilterSection = () => {
  // State for expansion
  const [expandColor, setExpandColor] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandDiscount, setExpandDiscount] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Constants for initial item count
  const COLOR_COUNT_WITHOUT_EXPAND = 5;
  const PRICE_COUNT_WITHOUT_EXPAND = 4;
  const DISCOUNT_COUNT_WITHOUT_EXPAND = 4;

  const updateFilterParams = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => setSearchParams(new URLSearchParams());

  return (
    <div className="-z-50 space-y-5 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          className="text-teal-700 cursor-pointer font-semibold"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>
      <Divider />
      {/* Filter Sections Container */}
      <div className="px-9 space-y-5">
        {/* Color Section */}
        <section>
          <FormControl component="fieldset">
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[700],
                pb: "14px",
              }}
              id="color-label" // Unique ID
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color-label"
              defaultValue=""
              name="color" // Unique name
              onChange={updateFilterParams}
              className="flex flex-col"
            >
              {colors
                .slice(
                  0,
                  expandColor ? colors.length : COLOR_COUNT_WITHOUT_EXPAND
                )
                .map((item) => (
                  <div className="flex flex-row items-center" key={item.hex}>
                    <FormControlLabel
                      value={item.color}
                      control={<Radio />}
                      label={item.name}
                    />
                    <span
                      style={{ backgroundColor: item.hex }}
                      className={`h-[18px] w-[18px] rounded-full border ml-2`}
                    ></span>
                  </div>
                ))}
            </RadioGroup>
          </FormControl>
          {colors.length > COLOR_COUNT_WITHOUT_EXPAND && ( // Only show button if needed
            <Button
              className="text-teal-700 cursor-pointer font-semibold block" // Added block display
              onClick={() => setExpandColor(!expandColor)}
              sx={{ textTransform: "none", paddingLeft: 0 }} // Style adjustments
            >
              {expandColor
                ? "Show Less"
                : `Show ${colors.length - COLOR_COUNT_WITHOUT_EXPAND} more`}
            </Button>
          )}
        </section>
        <Divider />
        <section>
          <FormControl component="fieldset">
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[700],
                pb: "14px",
              }}
              id="price-label"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price-label"
              defaultValue=""
              name="price" // Unique name
              onChange={updateFilterParams}
              className="flex flex-col"
            >
              {prices
                .slice(
                  0,
                  expandPrice ? prices.length : PRICE_COUNT_WITHOUT_EXPAND
                )
                .map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          {prices.length > PRICE_COUNT_WITHOUT_EXPAND && (
            <Button
              className="text-teal-700 cursor-pointer font-semibold block"
              onClick={() => setExpandPrice(!expandPrice)}
              sx={{ textTransform: "none", paddingLeft: 0 }}
            >
              {expandPrice
                ? "Show Less"
                : `Show ${prices.length - PRICE_COUNT_WITHOUT_EXPAND} more`}
            </Button>
          )}
        </section>
        <Divider />

        <section>
          <FormControl component="fieldset">
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[700],
                pb: "14px",
              }}
              id="discount-label"
            >
              Discount Percentage
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount-label"
              defaultValue=""
              name="discount"
              onChange={updateFilterParams}
              className="flex flex-col"
            >
              {discounts
                .slice(
                  0,
                  expandDiscount
                    ? discounts.length
                    : DISCOUNT_COUNT_WITHOUT_EXPAND
                )
                .map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value.toString()}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          {discounts.length > DISCOUNT_COUNT_WITHOUT_EXPAND && (
            <Button
              className="text-teal-700 cursor-pointer font-semibold block"
              onClick={() => setExpandDiscount(!expandDiscount)}
              sx={{ textTransform: "none", paddingLeft: 0 }}
            >
              {expandDiscount
                ? "Show Less"
                : `Show ${
                    discounts.length - DISCOUNT_COUNT_WITHOUT_EXPAND
                  } more`}
            </Button>
          )}
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
