/**
 * Form component for adding/editing categories
 */
import { CategoryFormData } from "../types";
import { TextField, Button} from "../vibes";
import { formStyle, buttonGroupStyle } from "../styles/modal_forms";
import { useCategoryForm } from "../hooks/useCategoryForm";
import { CATEGORY_EMOJIS } from "../constants/categoryEmojis";
import { GridSelect } from "../vibes/GridSelect";

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
  const {formData, errors, isSubmitting, handleChange, handleSubmit } = useCategoryForm({
    initialData,
    onSubmit,
  }); 

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Name"
        type="text"
        placeholder="Enter Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        required
      />
      <GridSelect
        label="Icon"
        options={CATEGORY_EMOJIS.map((emoji: string) => ({ value: emoji, label: emoji }))}
        value={formData.icon}
        onChange={(e) => handleChange("icon", e.target.value)}
        error={errors.icon}
        fullWidth
        required
      />
      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
