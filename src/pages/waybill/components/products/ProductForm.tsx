import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface ProductFormProps {
  itemNumber?: number;
  initialValues?: {
    productType: string;
    unit: string;
    quantity: number;
  };
  onSubmit: (values: { productType: string; unit: string; quantity: number }) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export const ProductForm = ({
  itemNumber = 1,
  initialValues = {
    productType: "",
    unit: "",
    quantity: 0,
  },
  // onSubmit,
  onDelete,
}: ProductFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);

  const productOptions = ["Rice", "Corn", "Wheat"];
  const unitOptions = ["Kilogram", "TON"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-lg font-medium">Item {itemNumber}</div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Type</label>
          <select
            name="productType"
            value={formValues.productType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 appearance-none bg-white"
          >
            <option value="">Select product type</option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Unit</label>
          <select
            name="unit"
            value={formValues.unit}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 appearance-none bg-white"
          >
            <option value="">Select unit</option>
            {unitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="relative">
            <input
              type="number"
              name="quantity"
              value={formValues.quantity}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter quantity"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {formValues.unit === "TON" ? "TON" : "Kg"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Item
          </button>
        )}
        <button
          // type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto"
        >
          Save
        </button>
      </div>
    </form>
  );
};
