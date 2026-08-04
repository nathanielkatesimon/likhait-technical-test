require 'rails_helper'

require "rails_helper"

RSpec.describe "Api::Categories", type: :request do
  describe "GET /api/categories" do
    let!(:food)      { Category.create!(name: "Food", icon: "🍔") }
    let!(:transport) { Category.create!(name: "Transport", icon: "🚗") }
    let!(:supplies)  { Category.create!(name: "Supplies", icon: "📦") }

    it "returns all categories" do
      get "/api/categories"

      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json.length).to eq(3)
      expect(json.map { |c| c["name"] }).to contain_exactly(
        "Food",
        "Transport",
        "Supplies"
      )
    end

    it "returns categories in alphabetical order" do
      get "/api/categories"

      json = JSON.parse(response.body)

      expect(json.map { |c| c["name"] }).to eq(
        ["Food", "Supplies", "Transport"]
      )
    end

    it "includes category icons" do
      get "/api/categories"

      json = JSON.parse(response.body)

      expect(json.first).to include(
        "name" => "Food",
        "icon" => "🍔"
      )
    end
  end

  describe "POST /api/categories" do
    context "with valid parameters" do
      let(:params) do
        {
          category: {
            name: "Utilities",
            icon: "💡"
          }
        }
      end

      it "creates a category" do
        expect {
          post "/api/categories", params: params
        }.to change(Category, :count).by(1)

        expect(response).to have_http_status(:created)

        json = JSON.parse(response.body)

        expect(json).to include(
          "name" => "Utilities",
          "icon" => "💡"
        )
      end
    end

    context "with invalid parameters" do
      let(:params) do
        {
          category: {
            name: "",
            icon: ""
          }
        }
      end

      it "returns validation errors" do
        expect {
          post "/api/categories", params: params
        }.not_to change(Category, :count)

        expect(response).to have_http_status(:unprocessable_entity)

        json = JSON.parse(response.body)

        expect(json["errors"]).to be_present
      end
    end

    context "when the category name already exists" do
      before do
        Category.create!(name: "Food", icon: "🍔")
      end

      let(:params) do
        {
          category: {
            name: "Food",
            icon: "🍕"
          }
        }
      end

      it "returns validation errors" do
        expect {
          post "/api/categories", params: params
        }.not_to change(Category, :count)

        expect(response).to have_http_status(:unprocessable_entity)

        json = JSON.parse(response.body)

        expect(json["errors"]).to include("Name has already been taken")
      end
    end
  end

  describe "PATCH /api/categories/:id" do
    let!(:category) do
      Category.create!(name: "Food", icon: "🍔")
    end

    context "with valid parameters" do
      let(:params) do
        {
          category: {
            name: "Dining",
            icon: "🍽️"
          }
        }
      end

      it "updates the category" do
        patch "/api/categories/#{category.id}", params: params

        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)

        expect(json).to include(
          "name" => "Dining",
          "icon" => "🍽️"
        )

        expect(category.reload.name).to eq("Dining")
        expect(category.icon).to eq("🍽️")
      end
    end

    context "with invalid parameters" do
      let(:params) do
        {
          category: {
            name: "",
            icon: ""
          }
        }
      end

      it "does not update the category" do
        patch "/api/categories/#{category.id}", params: params

        expect(response).to have_http_status(:unprocessable_entity)

        json = JSON.parse(response.body)

        expect(json["errors"]).to be_present

        expect(category.reload.name).to eq("Food")
        expect(category.icon).to eq("🍔")
      end
    end
  end

  describe "DELETE /api/categories/:id" do
    let!(:category) do
      Category.create!(name: "Food", icon: "🍔")
    end

    it "deletes the category" do
      expect {
        delete "/api/categories/#{category.id}"
      }.to change(Category, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
