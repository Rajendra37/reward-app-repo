import React from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/calculateRewardPoints";
import { CURRENCY_FORMATTER, LABELS } from "../constants/constants";

const TransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{LABELS.TABLE_HEADERS.TRANSACTION_ID}</th>
          <th>{LABELS.TABLE_HEADERS.AMOUNT}</th>
          <th>{LABELS.TABLE_HEADERS.DATE}</th>
          <th>{LABELS.TABLE_HEADERS.REWARD_POINTS}</th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>{CURRENCY_FORMATTER.format(txn.amount)}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>{calculateRewardPoints(txn.amount)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionTable;
