import React, {useState, useEffect} from 'react';
import { pageStyle, headerStyle, leftHeaderStyle, titleStyle } from "../styles/layout";
import { Category } from "../types.ts";
import { fetchCategories } from "../services/api.ts";
import CategoriesTable from "../components/CategoriesTable.tsx";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div style={leftHeaderStyle}>
          <h1 style={titleStyle}>Categories Page</h1>
        </div>
      </div>
      
      <div>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <CategoriesTable categories={categories} onCategoryUpdated={getCategories} />
        )}
      </div>
    </div>
  );
}

export default Categories;