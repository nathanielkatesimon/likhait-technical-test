import { Category, CategoryFormData } from "../types";
import { tableStyle, theadStyle, thStyle, tdStyle, actionButtonsStyle, emptyStyle } from "../styles/table.ts";
import { Button, Modal, Pagination } from "../vibes";
import { useEffect, useState } from "react";
import { CategoryForm } from "./CategoryForm.tsx";
import { deleteCategory, updateCategory } from "../services/api.ts";
import { COLORS } from "../constants/colors.ts";
import { usePagination } from "../hooks/usePagination.ts";

interface CategoriesTableProps {
  categories: Category[];
  isLoading: boolean;
  newCategory?: Category | null;
  onCategoryUpdated: () => void;
}

const ITEMS_PER_PAGE = 10;

export default function CategoriesTable({categories, isLoading, newCategory, onCategoryUpdated}: CategoriesTableProps) {
  const {currentPage, setCurrentPage, totalPages, currentItems, jumpToItem} = usePagination(categories, ITEMS_PER_PAGE);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  }

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  }

  const handleUpdate = async (data: CategoryFormData) => {
    if(!editingCategory) return;
    try {
      await updateCategory(editingCategory.id, data);
      setIsEditModalOpen(false);
      setEditingCategory(null);
      onCategoryUpdated();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  const confirmDelete = async () => {
    if (!deletingCategory) return;
    try {
      await deleteCategory(deletingCategory.id);
      setIsDeleteModalOpen(false);
      setDeletingCategory(null);
      onCategoryUpdated();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  }

  useEffect(() => {
    if(newCategory){
      jumpToItem((category) => category.id === newCategory?.id);
    }
  }, [newCategory]);

  if (categories.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>
          No Category found.
        </div>
      </div>
    );
  } 


  return (
    <>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Emoji</th>
            <th style={thStyle}>Name</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? 
            (<tr>
              <td colSpan={3} style={{ ...tdStyle, textAlign: "center" }}>
                Loading...
              </td>
            </tr>) 
            :
            currentItems.map((category) => (
              <tr key={category.id}>
                <td style={tdStyle}>{category.icon}</td>
                <td style={tdStyle}>{category.name}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <div style={{...actionButtonsStyle, justifyContent: "center"}}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(category)}
                    >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(category)}
                    >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            initialData={{
              name: editingCategory.name,
              icon: editingCategory.icon,
            }}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingCategory(null);
            }}
            submitLabel="Update Category"
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCategory(null);
        }}
        title="Delete Category"
      >
        <div style={{ padding: "1rem 0" }}>
          <p style={{ marginBottom: "1.5rem", color: COLORS.text.primary }}>
            Are you sure you want to delete this category?
          </p>
          {deletingCategory && (
            <p style={{ 
              marginBottom: "1.5rem", 
              color: COLORS.text.secondary, 
              background: COLORS.secondary.s01, 
              padding: "0.5rem", 
              borderRadius: "10px", 
              border: `1px solid ${COLORS.secondary.s02}` 
            }}>
              {deletingCategory.icon}&nbsp;
              <strong>{deletingCategory.name}</strong>
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingCategory(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}