import {
  fetchClass,
  fetchFamily,
  fetchSegment,
} from "@/app/services/adminServices";

export const formatDateToCustomFormat = (selectedDate) => {
  if (selectedDate) {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedDate;
  } else {
    return "";
  }
};

export const formatDate = (serverTime) => {
  const date = new Date(serverTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formattedDate;
};

export const getFamily = async (code) => {
  const { family } = await fetchFamily(code);
  return family;
};
export const getClass = async (code) => {
  const { _class } = await fetchClass(code);
  return _class;
};
export const getSegment = async (code) => {
  const { segment } = await fetchSegment(code);
  return segment;
};

import { format, startOfMonth, startOfYear, isSameDay } from "date-fns";

// Function to filter transactions based on date range
function filterTransactionsByDate(transactions, startDate, endDate) {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return (
      isSameDay(transactionDate, startDate) ||
      (transactionDate > startDate && transactionDate < endDate)
    );
  });
}

// Function to calculate amounts for Today, Monthly to Date, and Year to Date
export function calculateAmounts(transactions) {
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const startOfYearDate = startOfYear(today);

  const todayTransactions = filterTransactionsByDate(
    transactions,
    today,
    new Date(today.getTime() + 24 * 60 * 60 * 1000)
  );
  const monthToDateTransactions = filterTransactionsByDate(
    transactions,
    startOfMonthDate,
    today
  );
  const yearToDateTransactions = filterTransactionsByDate(
    transactions,
    startOfYearDate,
    today
  );

  const todayAmount = todayTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.totAmt),
    0
  );
  const monthToDateAmount = monthToDateTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.totAmt),
    0
  );
  const yearToDateAmount = yearToDateTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.totAmt),
    0
  );

  return {
    today: todayAmount,
    monthToDate: monthToDateAmount,
    yearToDate: yearToDateAmount,
  };
}
