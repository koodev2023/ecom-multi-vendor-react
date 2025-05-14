import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CreateDealsRequest,
  HomeCategory,
  HomeCategorySectionEnum,
} from "../../../api/generated-fetch";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchHomeCategories } from "../../../state/admin/adminHomeCategorySlice";
import { createDeal } from "../../../state/admin/adminDealSlice";

const createDealFormSchema = z.object({
  discount: z
    .number({
      required_error: "Discount amount is required.",
      invalid_type_error: "Discount must be a number.",
    })
    .positive({ message: "Discount must be a positive number." })
    .max(100, { message: "Discount cannot exceed 100 (assuming percentage)." })
    .finite({ message: "Discount must be a finite number." }),

  categoryId: z
    .number({
      required_error: "Please select a category.",
      invalid_type_error: "Invalid category selected.",
    })
    .int()
    .positive({ message: "Please select a valid category." }),
});

type CreateDealFormData = z.infer<typeof createDealFormSchema>;

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const customerHomeCategory = useAppSelector((s) => s.customerHomeCategory);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateDealFormData>({
    resolver: zodResolver(createDealFormSchema),
    mode: "onBlur",
    defaultValues: {
      discount: undefined,
      categoryId: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateDealFormData> = async (data) => {
    console.log("Form Data (Validated):", data);

    dispatch(
      createDeal({
        deal: {
          category: {
            id: data.categoryId,
          },
          discount: data.discount,
        },
      })
    );
  };

  return (
    <div style={styles.container}>
      <h2>Create New Deal</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label htmlFor="discount" style={styles.label}>
            Discount (%)
          </label>
          <input
            id="discount"
            type="number"
            step="0.01"
            {...register("discount", {
              valueAsNumber: true,
            })}
            style={
              errors.discount
                ? { ...styles.input, ...styles.inputError }
                : styles.input
            }
            aria-invalid={errors.discount ? "true" : "false"}
            aria-describedby={errors.discount ? "discount-error" : undefined}
            placeholder="e.g., 15"
          />
          {errors.discount && (
            <p id="discount-error" style={styles.errorMessage} role="alert">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div style={styles.fieldGroup}>
          <label htmlFor="categoryId" style={styles.label}>
            Category
          </label>

          <select
            id="categoryId"
            {...register("categoryId", {
              valueAsNumber: true,
            })}
            style={
              errors.categoryId
                ? { ...styles.select, ...styles.inputError }
                : styles.select
            }
            aria-invalid={errors.categoryId ? "true" : "false"}
            aria-describedby={errors.categoryId ? "category-error" : undefined}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select a Category --
            </option>
            {customerHomeCategory.homePageData?.dealCategories?.map(
              (category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryCode} ({category.section})
                </option>
              )
            )}
          </select>
          {errors.categoryId && (
            <p id="category-error" style={styles.errorMessage} role="alert">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          style={
            isSubmitting
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
        >
          {isSubmitting ? "Creating Deal..." : "Create Deal"}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "3px",
    fontSize: "0.9rem",
    color: "#333",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    background: "white",
  },
  inputError: {
    borderColor: "#dc3545",
    outlineColor: "#dc3545",
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: "0.85rem",
    margin: "5px 0 0 0",
  },
  button: {
    padding: "12px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
  },
};

export default CreateDealForm;
