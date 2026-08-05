require 'rails_helper'

RSpec.describe Expense, type: :model do
  let(:category) { Category.create!(name: "Food") }

  describe "date validation" do
    it "is valid when the date is today" do
      expense = Expense.new(
        category: category,
        date: Date.current
      )

      expect(expense).to be_valid
    end

    it "is valid when the date is in the past" do
      expense = Expense.new(
        category: category,
        date: 1.day.ago.to_date
      )

      expect(expense).to be_valid
    end

    it "is invalid when the date is in the future" do
      expense = Expense.new(
        category: category,
        date: 1.day.from_now.to_date
      )

      expect(expense).not_to be_valid
      expect(expense.errors[:date]).to include("can't be in the future")
    end
  end
end
