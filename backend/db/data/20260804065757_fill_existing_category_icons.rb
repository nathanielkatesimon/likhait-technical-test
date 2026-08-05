# frozen_string_literal: true

class FillExistingCategoryIcons < ActiveRecord::Migration[7.2]
  def up
    icon_map = {
      Food: "🍔",
      Transportation: "🚗",
      Entertainment: "🎬",
      Shopping: "🛍️",
      Bills: "📄",
      Healthcare: "🏥",
      Education: "📚",
      Travel: "✈️",
      Other: "📦"
    }

    Category.all.each do |category|
      category.update!(icon: icon_map[category.name.to_sym] || "📦")
    end
  end
end
