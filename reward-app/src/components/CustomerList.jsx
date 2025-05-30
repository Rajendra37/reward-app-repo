import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTransactions } from "../api/fetchTransactions";
import CustomerDetails from "./CustomerDetails";
import "./styles/CustomerList.css";
import { LABELS } from "../constants/constants";
import logger from "../loggers";
import Dropdown from "./Dropdown";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { SELECT_CUSTOMER } = LABELS;

  const getTransactions = async () => {
    try {
      const data = await fetchTransactions();
      const customerMap = {};
      data.forEach((transaction) => {
        if (!customerMap[transaction.customerId]) {
          customerMap[transaction.customerId] = [];
        }
        customerMap[transaction.customerId].push(transaction);
      });
      const customerList = Object.keys(customerMap).map((customerId) => ({
        customerId,
        transactions: customerMap[customerId],
      }));
      setCustomers(customerList);
      logger.info("Transactions loaded successfully");
    } catch (error) {
      logger.error("Error loading transactions", { error });
      throw error;
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const customer = customers.find((c) => c.customerId === selectedId);
    setSelectedCustomer(customer);
  };

  return (
    <div className="customer-list-container">
      <Dropdown
        options={customers.map((customer) => ({
          value: customer.customerId,
          label: `Customer: ${customer.customerId}`,
        }))}
        onChange={handleSelectChange}
        placeholder={SELECT_CUSTOMER}
      />

      {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
    </div>
  );
};

CustomerList.propTypes = {};

export default CustomerList;
