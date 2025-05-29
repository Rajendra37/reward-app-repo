import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../api/fetchTransactions";
import CustomerDetails from "./CustomerDetails";
import "./styles/CustomerList.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    } catch (error) {
      console.log(error);
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
      <select
        className="customer-select"
        onChange={handleSelectChange}
        defaultValue=""
      >
        <option value="">Select a customer</option>
        {customers.map((customerData) => (
          <option key={customerData.customerId} value={customerData.customerId}>
            {customerData.customerId}
          </option>
        ))}
      </select>
      {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
    </div>
  );
};

export default CustomerList;
