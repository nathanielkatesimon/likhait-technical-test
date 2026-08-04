class AddIconToCategory < ActiveRecord::Migration[7.2]
  def change
    add_column :categories, :icon, :string, null: false, default: "📦"
  end
end
