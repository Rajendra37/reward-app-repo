import React, { useState, useEffect } from "react";
import { calculateRewardPoints } from "../utils/calculateRewardPoints";
import "./styles/CustomerDetails.css";

const CustomerDetails = ({ customer }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("last3");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Group transactions by year and month
  const transactionsByYearMonth = customer.transactions.reduce((acc, txn) => {
    const date = new Date(txn.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(txn);

    return acc;
  }, {});

  const years = Array.from({ length: 4 }, (_, i) =>
    (currentYear - i).toString()
  );

  const months = [
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
  ];

  useEffect(() => {
    setSelectedYear(currentYear.toString());
  }, [currentYear]);

  // Get last 3 months' transactions
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
    selectedMonth === "last3"
      ? getLastThreeMonthsTransactions()
      : transactionsByYearMonth[selectedYear]?.[selectedMonth] || [];

  const totalPoints = customer.transactions.reduce(
    (acc, txn) => acc + calculateRewardPoints(txn.amount),
    0
  );

  const monthlyPoints = Object.entries(transactionsByYearMonth).flatMap(
    ([year, months]) =>
      Object.entries(months).map(([month, txns]) => ({
        year,
        month,
        points: txns.reduce(
          (sum, txn) => sum + calculateRewardPoints(txn.amount),
          0
        ),
      }))
  );

  return (
    <div className="customer-details">
      <h3>Customer: {customer.customerId}</h3>
      <p>
        <strong>Total Reward Points:</strong> {totalPoints}
      </p>
      <h4>Filter Transactions</h4>
      <div style={{ display: "flex", gap: "1rem" }}>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={selectedMonth === "last3"}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="last3">Last 3 Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <h4>
        Transactions{" "}
        {selectedMonth === "last3"
          ? "from Last 3 Months"
          : `in ${selectedMonth} ${selectedYear}`}
      </h4>

      {filteredTransactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.transactionId}>
                <td>{txn.transactionId}</td>
                <td>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(txn.amount)}
                </td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
                <td>{calculateRewardPoints(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default CustomerDetails;
