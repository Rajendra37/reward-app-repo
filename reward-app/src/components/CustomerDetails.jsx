import React, { useState, useEffect } from "react";
import { calculateRewardPoints } from "../utils/calculateRewardPoints";
import { MONTHS, LAST_3_MONTHS_OPTION, LABELS } from "../constants/constants";
import TransactionTable from "./TransactionTable";
import Dropdown from "./Dropdown";
import "./styles/CustomerDetails.css";

const CustomerDetails = ({ customer }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(LAST_3_MONTHS_OPTION);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  const currentYear = new Date().getFullYear();

  const groupTransactionsByYearMonth = (transactions) => {
    return transactions.reduce((acc, txn) => {
      const date = new Date(txn.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      acc[year] = acc[year] || {};
      acc[year][month] = acc[year][month] || [];
      acc[year][month].push(txn);

      return acc;
    }, {});
  };

  const transactionsByYearMonth = groupTransactionsByYearMonth(
    customer.transactions
  );

  const years = Array.from({ length: 4 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    setSelectedYear(currentYear.toString());
  }, [currentYear]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  const getLastThreeMonthsTransactions = () => {
    const now = new Date();
    return customer.transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const diffInMonths =
        now.getFullYear() * 12 +
        now.getMonth() -
        (txnDate.getFullYear() * 12 + txnDate.getMonth());
      return diffInMonths >= 0 && diffInMonths < 3;
    });
  };

  const filteredTransactions =
    selectedMonth === LAST_3_MONTHS_OPTION
      ? getLastThreeMonthsTransactions()
      : transactionsByYearMonth[selectedYear]?.[selectedMonth] || [];

  const totalPoints = customer.transactions.reduce(
    (acc, txn) => acc + calculateRewardPoints(txn.amount),
    0
  );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const {
    CUSTOMER_PREFIX,
    TOTAL_REWARD_POINTS,
    LAST_3_MONTHS_LABEL,
    MONTH_YEAR_LABEL,
    TRANSACTIONS_HEADER,
    PRIVIOUS,
    PAGE,
    OF,
    NEXT,
    NO_TRANSACTIONS,
  } = LABELS;


  console.log({transactionsByYearMonth})
  
  return (
    <div className="customer-details">
      <h3>
        {CUSTOMER_PREFIX} {customer.customerId}
      </h3>
      <p>
        <strong>{TOTAL_REWARD_POINTS}</strong> {totalPoints}
      </p>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Dropdown
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          options={years}
          disabled={selectedMonth === LAST_3_MONTHS_OPTION}
        />

        <Dropdown
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          options={[
            { value: LAST_3_MONTHS_OPTION, label: LAST_3_MONTHS_LABEL },
            ...MONTHS.map((month) => ({ value: month, label: month })),
          ]}
        />
      </div>

      <h4>
        {TRANSACTIONS_HEADER}
        {selectedMonth === LAST_3_MONTHS_OPTION
          ? ` ${LAST_3_MONTHS_LABEL}`
          : ` ${MONTH_YEAR_LABEL(selectedMonth, selectedYear)}`}
      </h4>

      {paginatedTransactions.length > 0 ? (
        <>
          <TransactionTable transactions={paginatedTransactions} />

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                {PRIVIOUS}
              </button>
              <span>
                {PAGE} {currentPage} {OF} {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {NEXT}
              </button>
            </div>
          )}
        </>
      ) : (
        <p>{NO_TRANSACTIONS}</p>
      )}
    </div>
  );
};

export default CustomerDetails;
