import { Category } from "../types";
import { tableStyle, theadStyle, thStyle, tdStyle, actionButtonsStyle, emptyStyle } from "../styles/table.ts";
import { getCategoryEmoji } from "../constants/categoryEmojis";
import { Button } from "../vibes";

interface CategoriesTableProps {
  categories: Category[];
  onCategoryUpdated: () => void;
}

export default function CategoriesTable({categories, onCategoryUpdated}: CategoriesTableProps) {

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
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={tdStyle}>{getCategoryEmoji(category.name)}</td>
              <td style={tdStyle}>{category.name}</td>
              <td style={{ ...tdStyle, textAlign: "center" }}>
                <Button
                  disabled
                  variant="secondary"
                  size="small"
                  onClick={() => void(0)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}