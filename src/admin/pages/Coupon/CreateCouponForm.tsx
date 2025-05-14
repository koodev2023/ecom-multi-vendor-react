import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponApi } from "../../../services/apiClient"; // Assuming this path is correct
import { Coupon, CreateCouponRequest } from "../../../api/generated-fetch"; // Using generated types

// --- Zod Schema Definition ---
const CouponSchema = z
  .object({
    code: z.string().min(1, "Coupon code is required"),
    discount: z.coerce
      .number()
      .min(0, "Discount value must be 0 or greater")
      .max(100, "Discount cannot exceed 100%"),
    validityStartDate: z.coerce.date().optional(),
    validityEndDate: z.coerce.date().optional(),
    minimumOrderValue: z.coerce
      .number()
      .min(0, "Minimum order value must be 0 or greater")
      .optional()
      .nullable(),
    // --- Correction Point ---
    // Rely on useForm's defaultValues for the initial state.
    // Zod just needs to ensure it's a boolean during validation.
    active: z.boolean(),
    // --- End Correction ---
  })
  .refine(
    (data) => {
      if (data.validityStartDate && data.validityEndDate) {
        return data.validityEndDate >= data.validityStartDate;
      }
      return true;
    },
    {
      message: "End date must be on or after the start date",
      path: ["validityEndDate"],
    }
  );

// --- Form Input Type from Schema ---
// This type will now correctly infer active as `boolean` without potential undefined issues from Zod's default
type CouponFormInputs = z.infer<typeof CouponSchema>;

// --- React Component ---
const CreateCouponForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CouponFormInputs>({
    // The resolver now works with the simplified 'active' schema definition
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      // This correctly sets the initial value for the controlled checkbox
      active: true,
      minimumOrderValue: null, // Or undefined if preferred/required by API
      // code: '', // Optional: Set defaults for other fields if needed
      // discount: 0,
      // validityStartDate: undefined,
      // validityEndDate: undefined,
    },
  });

  const onSubmit: SubmitHandler<CouponFormInputs> = async (data) => {
    console.log("Form Data Submitted:", data);

    // Construct the payload. Ensure Date objects are handled correctly
    // by your API client (e.g., auto-serialized to ISO strings).
    // If not, you might need to convert them here: data.validityStartDate?.toISOString()
    const couponPayload: Partial<Coupon> = {
      code: data.code,
      discountPercentage: data.discount,
      active: data.active, // Directly use the boolean value
      validityStartDate: data.validityStartDate, // Pass Date object or convert if needed
      validityEndDate: data.validityEndDate, // Pass Date object or convert if needed
      // Ensure null/undefined handling matches API expectation for optional numbers
      minimumOrderValue:
        data.minimumOrderValue === null || data.minimumOrderValue === undefined
          ? undefined
          : data.minimumOrderValue,
    };

    // Remove properties that are undefined, as some APIs prefer omitting the key
    Object.keys(couponPayload).forEach((key) => {
      if (couponPayload[key as keyof Coupon] === undefined) {
        delete couponPayload[key as keyof Coupon];
      }
    });

    const requestPayload: CreateCouponRequest = {
      // Important: Check if your generated 'CreateCouponRequest' interface
      // expects the 'coupon' property to be Partial<Coupon> or a specific subset.
      // Adjust 'couponPayload' type/construction if needed.
      // Assuming it expects Partial<Coupon> or similar.
      coupon: couponPayload as Coupon, // Asserting as Coupon, ensure fields match API
    };

    try {
      await couponApi.createCoupon(requestPayload);
      alert("Coupon created successfully!");
      reset(); // Reset form to defaultValues
    } catch (error) {
      console.error("Failed to create coupon:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      // Consider more specific error handling if the API provides details
      alert(`Failed to create coupon: ${errorMessage}. Please try again.`);
    }
  };

  // --- JSX remains the same as the previous version ---
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Coupon
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Coupon Code */}
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Coupon Code <span className="text-red-500">*</span>
          </label>
          <input
            id="code"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("code")}
            disabled={isSubmitting}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        {/* Discount Percentage */}
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Discount Percentage <span className="text-red-500">*</span>
          </label>
          <input
            id="discount"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("discount")}
            disabled={isSubmitting}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discount.message}
            </p>
          )}
        </div>

        {/* Validity Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="validityStartDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Valid From (Optional)
            </label>
            <input
              id="validityStartDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("validityStartDate")}
              disabled={isSubmitting}
            />
            {errors.validityStartDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.validityStartDate.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="validityEndDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Valid Until (Optional)
            </label>
            <input
              id="validityEndDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("validityEndDate")}
              disabled={isSubmitting}
            />
            {errors.validityEndDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.validityEndDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Minimum Order Value */}
        <div>
          <label
            htmlFor="minimumOrderValue"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Order Value (Optional)
          </label>
          <input
            id="minimumOrderValue"
            type="number"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("minimumOrderValue")}
            disabled={isSubmitting}
            placeholder="e.g., 50.00"
          />
          {errors.minimumOrderValue && (
            <p className="text-red-500 text-sm mt-1">
              {errors.minimumOrderValue.message}
            </p>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            id="active"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            {...register("active")} // Registering the checkbox
            disabled={isSubmitting}
            // The default checked state is handled by useForm's defaultValues
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Coupon is Active
          </label>
          {/* No specific error display needed usually for a required checkbox like this */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
};

export default CreateCouponForm;
