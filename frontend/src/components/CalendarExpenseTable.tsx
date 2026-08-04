/**
 * Calendar expense table component
 */

import { useEffect, useState } from "react";
import { Category, Expense, ExpenseFormData } from "../types";
import { formatCurrency, formatDate } from "../utils/expenseUtils";
import { COLORS } from "../constants/colors";
import { Button, Modal, Pagination } from "../vibes";
import { ExpenseForm } from "./ExpenseForm.tsx";
import { deleteExpense, updateExpense } from "../services/api";
import { tableStyle, theadStyle, thStyle, tdStyle, actionButtonsStyle, emptyStyle } from "../styles/table.ts";
import { usePagination } from "../hooks/usePagination.ts";

interface CalendarExpenseTableProps {
  expenses: Expense[];
  isLoading: boolean;
  resetPageOn: number[];
  categoryOptions: Category[];
  onExpenseUpdated: () => void;
}

const ITEMS_PER_PAGE = 10;

export function CalendarExpenseTable({
  expenses,
  isLoading,
  resetPageOn,
  categoryOptions,
  onExpenseUpdated,
}: CalendarExpenseTableProps) {
  const { currentPage, totalPages, setCurrentPage, currentItems: currentExpenses } = usePagination(expenses, ITEMS_PER_PAGE);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    setDeletingExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingExpense) return;
    try {
      await deleteExpense(deletingExpense.id);
      setIsDeleteModalOpen(false);
      setDeletingExpense(null);
      onExpenseUpdated();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense");
    }
  };

  const handleUpdate = async (data: ExpenseFormData) => {
    if (!editingExpense) return;
    try {
      await updateExpense(editingExpense.id, data);
      setIsEditModalOpen(false);
      setEditingExpense(null);
      onExpenseUpdated();
    } catch (error) {
      console.error("Failed to update expense:", error);
      throw error;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [...resetPageOn]);

  if (expenses.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>
          No expenses found. Add your first expense to get started!
        </div>
      </div>
    );
  }

  return (
    <>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Amount</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ?
          (<tr>
            <td colSpan={5} style={{ ...tdStyle, textAlign: "center" }}>
              Loading...
            </td>
          </tr>)
          : 
          currentExpenses.map((expense) => (
            <tr key={expense.id}>
              <td style={tdStyle}>{formatDate(new Date(expense.date))}</td>
              <td style={tdStyle}>{expense.description}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>{expense.category_icon}</span>
                  <span>{expense.category}</span>
                </span>
              </td>
              <td style={{ ...tdStyle, textAlign: "left", fontWeight: 600 }}>
                {formatCurrency(expense.amount)}
              </td>
              <td style={{ ...tdStyle, textAlign: "center" }}>
                <div style={actionButtonsStyle}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(expense)}
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
          setEditingExpense(null);
        }}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            categoryOptions={categoryOptions}
            initialData={{
              amount: editingExpense.amount.toString(),
              description: editingExpense.description,
              category: editingExpense.category,
              date: formatDate(new Date(editingExpense.date)),
            }}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingExpense(null);
            }}
            submitLabel="Update Expense"
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingExpense(null);
        }}
        title="Delete Expense"
      >
        <div style={{ padding: "1rem 0" }}>
          <p style={{ marginBottom: "1.5rem", color: COLORS.text.primary }}>
            Are you sure you want to delete this expense?
          </p>
          {deletingExpense && (
            <p style={{ marginBottom: "1.5rem", color: COLORS.text.secondary }}>
              <strong>{deletingExpense.description}</strong> -{" "}
              {formatCurrency(deletingExpense.amount)}
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
                setDeletingExpense(null);
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
  );
}
