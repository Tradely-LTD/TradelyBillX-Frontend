import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useFormContext } from "../formContext";

interface Product {
  id: number;
  productName: string;
  unit: string;
  quantity: number;
}

const productOptions = [
  "Rice",
  "Corn",
  "Wheat",
  "Maize",
  "Millet",
  "Sorghum",
  "Barley",
  "Oats",
  "Tomatoes",
  "Onions",
  "",
];
const unitOptions = ["Piece(s)", "Grams", "Kilogram", "Tone", "Bag(s)", "Crate", "Box(s)", ""];

export const ProductDetails: React.FC = ({ methods }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    productName: "",
    unit: "",
    quantity: 0,
  });
  const [editProduct, setEditProduct] = useState<Omit<Product, "id">>({
    productName: "",
    unit: "",
    quantity: 0,
  });
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = methods;
  const formProducts = watch("products") || [];

  // Synchronize local state with form state
  useEffect(() => {
    setLocalProducts(formProducts);
  }, []);

  const handleAdd = () => {
    if (newProduct.productName && newProduct.unit && newProduct.quantity > 0) {
      const newItem = { id: Date.now(), ...newProduct };
      const updatedItems = [...localProducts, newItem];
      setValue("products", updatedItems);
      setLocalProducts(updatedItems);
      setNewProduct({ productName: "", unit: "", quantity: 0 });
    }
  };

  const startEdit = (id: number) => {
    const item = localProducts.find((item) => item.id === id);
    if (item) {
      setEditingId(id);
      setEditProduct(item);
    }
  };

  const saveEdit = () => {
    if (editingId !== null) {
      const updatedItems = localProducts.map((item) =>
        item.id === editingId ? { ...item, ...editProduct } : item
      );
      setValue("products", updatedItems);
      setLocalProducts(updatedItems);
      setEditingId(null);
    }
  };

  const deleteItem = (id: number) => {
    const updatedItems = localProducts.filter((item) => item.id !== id);
    setValue("products", updatedItems);
    setLocalProducts(updatedItems); // Force immediate UI update
  };

  return (
    <div className="rounded-[15px] border border-[#F0F2F4] p-[20px] flex justify-between flex-col gap-[20px] flex-1">
      <div className="flex gap-3 mb-6">
        <img src="truck.png" alt="Truck" className="h-[48px] w-[48px]" />
        <div>
          <div className="text-lg font-semibold">Product Information</div>
          <div className="text-gray-500">
            What items will you be transporting? Please add details about the items and their
            quantity.
          </div>
        </div>
      </div>

      <div className="space-y-4 ">
        {localProducts.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b p-2 items-center flex-wrap md:flex-nowrap"
          >
            {editingId === item.id ? (
              <>
                <select
                  value={editProduct.productName}
                  onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
                  className="p-2 rounded border border-gray-200 flex-1"
                >
                  <option value="">Select product</option>
                  {productOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <select
                  value={editProduct.unit}
                  onChange={(e) => setEditProduct({ ...editProduct, unit: e.target.value })}
                  className="p-2 rounded border border-gray-200 flex-1"
                >
                  <option value="">Select unit</option>
                  {unitOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="number"
                    value={editProduct.quantity}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, quantity: Number(e.target.value) })
                    }
                    className="w-full p-2 rounded border border-green-500"
                  />
                  <span>{editProduct.unit}</span>
                </div>

                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="flex-1">{item.productName}</div>
                <div className="flex-1">
                  {item.quantity} {item.unit}
                </div>
                <button
                  onClick={() => startEdit(item.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ))}

        <div className="flex gap-4 items-center flex-wrap w-full">
          <select
            value={newProduct.productName}
            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
            className="p-2 rounded border border-gray-200 flex-1"
          >
            <option value="">Select product</option>
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={newProduct.unit}
            onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
            className="p-2 rounded border border-gray-200 flex-1"
          >
            <option value="">Select unit</option>
            {unitOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
              className="w-full p-2 rounded border border-green-500"
            />
            <span>{newProduct.unit}</span>
          </div>

          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
