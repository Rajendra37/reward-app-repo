import React from "react";
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
        {transactions.map((txn) => (
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

export default TransactionTable;
