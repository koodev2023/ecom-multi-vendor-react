import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
  useEffect,
} from "react"; // Added useMemo, useEffect
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { CreateProductRequestDto } from "../../../api/generated-fetch";
import { useAppDispatch } from "../../../state/store";
import { createProduct } from "../../../state/seller/sellerProductSlice";
import { mainCategory } from "../../../data/category/mainCategory";
import { colors } from "../../../data/filter/color";
import { sizes } from "../../../data/filter/size";

const colorOptions = [
  { value: "", label: "Select Color" },
  ...colors.map((color) => ({
    value: color.name,
    label: color.name,
  })),
  { value: "Multi-Color", label: "Multi-Color" },
  { value: "Other", label: "Other" },
];

// --- Define types for options ---
interface SelectOption {
  value: string;
  label: string;
}

// Define the shape of the formData state
interface ProductFormData {
  title: string;
  description: string;
  mrpPrice: string;
  sellingPrice: string;
  color: string;
  categoryCode: string; // Level 1
  categoryCode2: string; // Level 2
  categoryCode3: string; // Level 3
  size: string;
  images: string[];
}

const getJwtToken = (): string | null => {
  return localStorage.getItem("token") || null;
};

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    color: "",
    categoryCode: "", // Level 1 selected code
    categoryCode2: "", // Level 2 selected code
    categoryCode3: "", // Level 3 selected code
    size: "",
    images: [],
  });

  // State for dynamic category options
  const [level2Options, setLevel2Options] = useState<SelectOption[]>([]);
  const [level3Options, setLevel3Options] = useState<SelectOption[]>([]);

  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- Generate Level 1 options (using useMemo for slight optimization if needed) ---
  const categoryLevel1Options: SelectOption[] = useMemo(
    () => [
      { value: "", label: "Select Category Level 1 *" },
      ...mainCategory.map((cat1) => ({
        value: cat1.categoryCode,
        label: cat1.name,
      })),
    ],
    []
  ); // Empty dependency array means this runs only once

  // --- Effect to update Level 2 options when Level 1 changes ---
  useEffect(() => {
    // Find the selected Level 1 category object
    const selectedLevel1 = mainCategory.find(
      (cat1) => cat1.categoryCode === formData.categoryCode
    );

    // Prepare default option
    const defaultOption = [
      { value: "", label: "Select Category Level 2 (Optional)" },
    ];

    if (selectedLevel1 && selectedLevel1.levelTwoCategory) {
      // Map Level 2 categories to options format
      const options = selectedLevel1.levelTwoCategory.map((cat2) => ({
        value: cat2.categoryCode,
        label: cat2.name,
      }));
      setLevel2Options([...defaultOption, ...options]);
    } else {
      // If no Level 1 selected or it has no Level 2, reset options
      setLevel2Options(defaultOption);
    }

    // IMPORTANT: Reset Level 2 and Level 3 selections in formData and Level 3 options
    setFormData((prevData) => ({
      ...prevData,
      categoryCode2: "",
      categoryCode3: "",
    }));
    setLevel3Options([
      { value: "", label: "Select Category Level 3 (Optional)" },
    ]);
  }, [formData.categoryCode]); // Re-run ONLY when categoryCode (Level 1) changes

  // --- Effect to update Level 3 options when Level 2 changes ---
  useEffect(() => {
    // Prepare default option
    const defaultOption = [
      { value: "", label: "Select Category Level 3 (Optional)" },
    ];

    // Check if Level 1 and Level 2 codes are selected
    if (formData.categoryCode && formData.categoryCode2) {
      // Find the selected Level 1 category
      const selectedLevel1 = mainCategory.find(
        (cat1) => cat1.categoryCode === formData.categoryCode
      );
      // Find the selected Level 2 category within Level 1
      const selectedLevel2 = selectedLevel1?.levelTwoCategory?.find(
        (cat2) => cat2.categoryCode === formData.categoryCode2
      );

      if (selectedLevel2 && selectedLevel2.levelThreeCategory) {
        // Map Level 3 categories to options format
        const options = selectedLevel2.levelThreeCategory.map((cat3) => ({
          value: cat3.categoryCode,
          label: cat3.name,
        }));
        setLevel3Options([...defaultOption, ...options]);
      } else {
        // If no Level 2 selected or it has no Level 3, reset options
        setLevel3Options(defaultOption);
      }
    } else {
      // If Level 1 or Level 2 is not selected, reset options
      setLevel3Options(defaultOption);
    }

    // IMPORTANT: Reset Level 3 selection in formData when Level 2 changes
    setFormData((prevData) => ({
      ...prevData,
      categoryCode3: "",
    }));
  }, [formData.categoryCode, formData.categoryCode2]); // Re-run when EITHER Level 1 or Level 2 changes

  // --- Unified handleChange ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // The useEffect hooks above will handle updating dependent dropdowns
  };

  // --- Image handling functions (handleImageChange, handleRemoveImage) remain the same ---
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setImageUploadError(null);
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, imageUrl],
        }));
      } else {
        throw new Error("Cloudinary upload did not return a URL.");
      }
    } catch (err: any) {
      const uploadErrorMessage =
        err.message || "An error occurred during image upload.";
      setImageUploadError(`Failed to upload image: ${uploadErrorMessage}`);
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // --- handleSubmit remains largely the same ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const jwtToken = getJwtToken();
    if (!jwtToken) {
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
      return;
    }

    // Validation: Ensure Level 1 Category is selected
    if (!formData.categoryCode) {
      setError("Please select a Category (Level 1).");
      setIsLoading(false);
      return;
    }
    // Other required fields (add title, sellingPrice as needed based on original code)
    if (!formData.title || !formData.sellingPrice) {
      setError("Please fill in Title and Selling Price.");
      setIsLoading(false);
      return;
    }

    const requestData: CreateProductRequestDto = {
      title: formData.title || undefined,
      description: formData.description || undefined,
      mrpPrice: formData.mrpPrice ? parseFloat(formData.mrpPrice) : undefined,
      sellingPrice: formData.sellingPrice
        ? parseFloat(formData.sellingPrice)
        : undefined,
      color: formData.color || undefined,
      images: formData.images.length > 0 ? formData.images : undefined,
      categoryCode: formData.categoryCode || undefined, // Level 1 code
      categoryCode2: formData.categoryCode2 || undefined, // Level 2 code
      categoryCode3: formData.categoryCode3 || undefined, // Level 3 code
      size: formData.size || undefined,
    };

    // Basic validation for numeric fields before submission
    if (requestData.mrpPrice !== undefined && isNaN(requestData.mrpPrice)) {
      setError("MRP Price must be a valid number.");
      setIsLoading(false);
      return;
    }
    // Selling price is required, so its parsed value must be a number
    if (isNaN(requestData.sellingPrice!)) {
      setError("Selling Price must be a valid number.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Request Data:", requestData);

      dispatch(
        createProduct({
          createProductRequest: {
            authorization: jwtToken,
            createProductRequestDto: requestData,
          },
        })
      );

      setSuccessMessage(`Product "${formData.title}" was added successfully!`);
      // Reset form
      // setFormData({
      //   title: "",
      //   description: "",
      //   mrpPrice: "",
      //   sellingPrice: "",
      //   color: "",
      //   categoryCode: "",
      //   categoryCode2: "",
      //   categoryCode3: "",
      //   size: "",
      //   images: [],
      // });
      // Note: level2Options and level3Options will be reset by useEffect hooks
      setImageUploadError(null);
    } catch (err: any) {
      console.error("Failed to add product:", err);
      const submissionErrorMessage =
        err?.message ||
        err?.body?.message ||
        "An unexpected error occurred during product submission.";
      setError(`Failed to add product: ${submissionErrorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title, Description, Prices, Color, Size (remain the same) */}
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Title: *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded box-border focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded min-h-20 box-border focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="mrpPrice"
              className="block mb-1 font-medium text-gray-700"
            >
              MRP Price:
            </label>
            <input
              type="number"
              id="mrpPrice"
              name="mrpPrice"
              value={formData.mrpPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="e.g., 99.99"
              className="w-full p-2 border border-gray-300 rounded box-border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="sellingPrice"
              className="block mb-1 font-medium text-gray-700"
            >
              Selling Price: *
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              placeholder="e.g., 79.99"
              className="w-full p-2 border border-gray-300 rounded box-border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Color Select */}
        <div>
          <label
            htmlFor="color"
            className="block mb-1 font-medium text-gray-700"
          >
            Color:
          </label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded box-border bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Size Select */}
        <div>
          <label
            htmlFor="size"
            className="block mb-1 font-medium text-gray-700"
          >
            Size:
          </label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded box-border bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            {sizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* --- Category Selects (Dynamic) --- */}
        {/* Category Level 1 Select */}
        <div>
          <label
            htmlFor="categoryCode"
            className="block mb-1 font-medium text-gray-700"
          >
            Category (Level 1): *
          </label>
          <select
            id="categoryCode"
            name="categoryCode"
            value={formData.categoryCode}
            onChange={handleChange}
            required // Only Level 1 is required
            className="w-full p-2 border border-gray-300 rounded box-border bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            {categoryLevel1Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Level 2 Select */}
        <div>
          <label
            htmlFor="categoryCode2"
            className="block mb-1 font-medium text-gray-700"
          >
            Category (Level 2):
          </label>
          <select
            id="categoryCode2"
            name="categoryCode2"
            value={formData.categoryCode2}
            onChange={handleChange}
            required
            disabled={!formData.categoryCode || level2Options.length <= 1}
            className={`w-full p-2 border border-gray-300 rounded box-border bg-white focus:ring-blue-500 focus:border-blue-500 ${
              !formData.categoryCode || level2Options.length <= 1
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
          >
            {level2Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Level 3 Select */}
        <div>
          <label
            htmlFor="categoryCode3"
            className="block mb-1 font-medium text-gray-700"
          >
            Category (Level 3):
          </label>
          <select
            id="categoryCode3"
            name="categoryCode3"
            value={formData.categoryCode3}
            onChange={handleChange}
            required
            disabled={!formData.categoryCode2 || level3Options.length <= 1}
            className={`w-full p-2 border border-gray-300 rounded box-border bg-white focus:ring-blue-500 focus:border-blue-500 ${
              !formData.categoryCode2 || level3Options.length <= 1
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
          >
            {level3Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* --- End Category Selects --- */}

        {/* Image Upload (remains the same) */}
        <div>
          <label
            htmlFor="imageUpload"
            className="block mb-1 font-medium text-gray-700"
          >
            Upload Images (Max 5):
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploadingImage || formData.images.length >= 5}
            className="w-full p-2 border border-gray-300 rounded box-border text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.images.length >= 5 && (
            <p className="text-sm text-yellow-600 mt-1">
              Maximum 5 images allowed.
            </p>
          )}
          {isUploadingImage && (
            <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
          )}
          {imageUploadError && (
            <p className="mt-2 p-3 rounded text-sm bg-red-100 text-red-700 border border-red-300">
              {imageUploadError}
            </p>
          )}

          {formData.images.length > 0 && (
            <div className="mt-3 p-3 border border-gray-200 rounded bg-gray-50">
              <p className="mb-2 font-medium text-gray-600 text-sm">
                Uploaded Images ({formData.images.length}):
              </p>
              <div className="flex flex-wrap gap-3">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`preview ${index}`}
                      className="w-16 h-16 object-cover rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-white hover:bg-red-700 focus:outline-none"
                      disabled={isUploadingImage || isLoading}
                      aria-label={`Remove image ${index + 1}`}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submission Area (remains the same) */}
        <div className="pt-4">
          {error && (
            <p className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300 text-sm">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300 text-sm">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading || isUploadingImage}
            className={`w-full px-6 py-3 bg-blue-600 text-white font-semibold border-none rounded cursor-pointer text-base transition duration-150 ease-in-out ${
              isLoading || isUploadingImage
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? "Adding Product..."
              : isUploadingImage
              ? "Waiting for Upload..."
              : "Add Product"}
          </button>
          {isLoading && (
            <p className="mt-2 text-sm text-center text-blue-600">
              Processing submission...
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
