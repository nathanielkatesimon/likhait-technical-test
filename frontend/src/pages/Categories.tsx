import React, {useState, useEffect} from 'react';
import { pageStyle, headerStyle, leftHeaderStyle, titleStyle, loadingStyle } from "../styles/layout";
import { Category, CategoryFormData } from "../types.ts";
import { createCategory, fetchCategories } from "../services/api.ts";
import CategoriesTable from "../components/CategoriesTable.tsx";
import { CategoryForm } from "../components/CategoryForm.tsx";
import { Button, Modal } from "../vibes";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      setIsModalOpen(false);
      getCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  }

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div style={leftHeaderStyle}>
          <h1 style={titleStyle}>Categories Page</h1>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>
      
      <div>
        {loading ? (
          <div style={loadingStyle}>Loading Categories...</div>
        ) : (
          <CategoriesTable categories={categories} onCategoryUpdated={getCategories} />
        )}
      </div>


      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Categories;