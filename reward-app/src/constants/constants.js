export const MONTHS = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export const LAST_3_MONTHS_OPTION = "last3";

export const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const LABELS = Object.freeze({
  SELECT_CUSTOMER: "Select a customer",
  CUSTOMER_PREFIX: "Customer:",
  TOTAL_REWARD_POINTS: "Total Reward Points:",
  FILTER_TRANSACTIONS: "Filter Transactions",
  TRANSACTIONS_HEADER: "Transactions",
  LAST_3_MONTHS_LABEL: "Last 3 Months",
  MONTH_YEAR_LABEL: (month, year) => `in ${month} ${year}`,
  NO_TRANSACTIONS: "No transactions found.",
  TABLE_HEADERS: Object.freeze({
    TRANSACTION_ID: "Transaction ID",
    AMOUNT: "Amount",
    DATE: "Date",
    REWARD_POINTS: "Reward Points",
  }),
  PRIVIOUS: "Previous",
  PAGE: "Page",
  OF: "of",
  NEXT: "Next",
});