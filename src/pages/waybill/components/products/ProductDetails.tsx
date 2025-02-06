import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ProductItemRow } from "./ProductItemRow";
import { ProductForm } from "./ProductForm";

export const ProductDetails: React.FC = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleAddItem = () => {
    setShowForm(true);
    setEditingItemId(null);
  };

  const handleSubmit = (values) => {
    if (editingItemId !== null) {
      setItems(items.map((item) => (item.id === editingItemId ? { ...item, ...values } : item)));
    } else {
      const newItem = { id: Date.now(), ...values };
      setItems([...items, newItem]);
    }
    setShowForm(false);
    setEditingItemId(null);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItemId(id);
      setShowForm(true);
    }
  };

  return (
    <div className="rounded-[15px] border border-[#F0F2F4] p-[20px] flex justify-between gap-[20px] flex-1">
      <div className="flex gap-3 mb-6">
        <img src="truck.png" className="h-[48px] w-[48px]" />
        <div>
          <div className="text-lg font-semibold">Product Information</div>
          <div className="text-gray-500">
            What items will you be transporting? Please add details about the items and their
            quantity.
          </div>
        </div>
      </div>

      <div className="space-y-4 w-[60%]">
        {/* Render existing items */}
        {items.map((item, index) => (
          <ProductItemRow
            key={item.id} // Use a unique key for each item
            index={index + 1}
            productName={item.productType}
            unit={item.unit}
            quantity={item.quantity}
            onEdit={() => handleEditItem(item.id)} // Pass the item ID to edit
            onDelete={() => handleDeleteItem(item.id)} // Pass the item ID to delete
          />
        ))}

        {/* Render the form if showForm is true */}
        {showForm && (
          <ProductForm
            itemNumber={items.length + 1} // Display the next item number
            initialValues={
              editingItemId !== null
                ? items.find((item) => item.id === editingItemId)
                : { productType: "", unit: "", quantity: "" }
            }
            onSubmit={handleSubmit}
            onDelete={() => {
              if (editingItemId !== null) {
                handleDeleteItem(editingItemId); // Delete the item being edited
              }
              setShowForm(false); // Hide the form
              setEditingItemId(null); // Reset editing state
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingItemId(null);
            }}
          />
        )}

        {/* Show "More Item" button if the form is not visible */}
        {!showForm && (
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 flex items-center gap-2 text-green-600 font-medium"
          >
            <Plus className="w-5 h-5" />
            More Item
          </button>
        )}
      </div>
    </div>
  );
};
