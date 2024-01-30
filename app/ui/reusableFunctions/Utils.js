import {
  fetchClass,
  fetchFamily,
  fetchSegment,
} from "@/app/services/adminServices";
import { formatDistanceToNow, isThisMonth, isToday } from "date-fns";

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
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

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

export const checkDates = (transactions) => {
  const todayTransactions = transactions.filter((transaction) => {
    const todayTransactionDate = new Date(transaction.createdAt);
    return isToday(todayTransactionDate);
  });
  const monthTransations = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return isThisMonth(transactionDate);
  });
  const yearTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate;
  });

  return {
    todayTransactions,
    monthTransations,
    yearTransactions,
  };
};

export const calculateTotalAmount = (transactions) => {
  const { todayTransactions, monthTransations, yearTransactions } =
    checkDates(transactions);

  const todayTotalAmount = todayTransactions.reduce((acc, transaction) => {
    return acc + Number(transaction.totAmt);
  }, 0);
  const monthTotalAmount = monthTransations.reduce((acc, transaction) => {
    return acc + Number(transaction.totAmt);
  }, 0);
  const yearTotalAmount = yearTransactions.reduce((acc, transaction) => {
    return acc + Number(transaction.totAmt);
  }, 0);

  return {
    todayTotalAmount,
    monthTotalAmount,
    yearTotalAmount,
  };
};
