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

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDateUtil = (serverTime) => {
  const serverDate = new Date(serverTime);
  const date = serverDate.getDate();
  const month = months[serverDate.getMonth()];
  const year = serverDate.getFullYear();
  const formattedTime = `${date} ${month},${year}`;
  return formattedTime;
};
export const formatTime = (serverTime) => {
  const serverDate = new Date(serverTime);
  const hours = serverDate.getHours();
  const minutes = serverDate.getMinutes();
  const seconds = serverDate.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedTime;
};
