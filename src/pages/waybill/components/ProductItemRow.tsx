import React from "react";
import { Edit2, Trash2 } from "lucide-react";

interface ProductItemProps {
  index: number;
  productName: string;
  unit: string;
  quantity: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProductItemRow = ({
  index,
  productName,
  unit,
  quantity,
  onEdit,
  onDelete,
}: ProductItemProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium">{index}</span>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{productName}</span>
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-medium">
          {quantity} {unit === "Kilogram" ? "Kg" : unit}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
