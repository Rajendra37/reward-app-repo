import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
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
    return transactions.reduce((accumulator, transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      accumulator[year] = accumulator[year] || {};
      accumulator[year][month] = accumulator[year][month] || [];
      accumulator[year][month].push(transaction);

      return accumulator;
    }, {});
  };

  const transactionsByYearMonth = useMemo(
    () => groupTransactionsByYearMonth(customer.transactions),
    [customer.transactions]
  );

  const years = useMemo(
    () => Array.from({ length: 4 }, (_, i) => (currentYear - i).toString()),
    [currentYear]
  );

  useEffect(() => {
    setSelectedYear(currentYear.toString());
  }, [currentYear]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  const lastThreeMonthsTransactions = useMemo(() => {
    const now = new Date();
    return customer.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const diffInMonths =
        now.getFullYear() * 12 +
        now.getMonth() -
        (transactionDate.getFullYear() * 12 + transactionDate.getMonth());
      return diffInMonths >= 0 && diffInMonths < 3;
    });
  }, [customer.transactions]);

  const filteredTransactions =
    selectedMonth === LAST_3_MONTHS_OPTION
      ? lastThreeMonthsTransactions
      : transactionsByYearMonth[selectedYear]?.[selectedMonth] || [];

  const totalPoints = customer.transactions.reduce(
    (accumulator, transaction) =>
      accumulator + calculateRewardPoints(transaction.amount),
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

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

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
          value={selectedMonth}
          onChange={handleMonthChange}
          options={[
            { value: LAST_3_MONTHS_OPTION, label: LAST_3_MONTHS_LABEL },
            ...MONTHS.map((month) => ({ value: month, label: month })),
          ]}
        />
        <Dropdown
          value={selectedYear}
          onChange={handleYearChange}
          options={years}
        />
      </div>

      <h4>
        {TRANSACTIONS_HEADER}
        {(selectedMonth === LAST_3_MONTHS_OPTION &&
          ` ${LAST_3_MONTHS_LABEL}`) ||
          ` ${MONTH_YEAR_LABEL(selectedMonth, selectedYear)}`}
      </h4>

      {paginatedTransactions.length > 0 && (
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
      )}
      {paginatedTransactions.length === 0 && <p>{NO_TRANSACTIONS}</p>}
    </div>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        transactionId: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CustomerDetails;
