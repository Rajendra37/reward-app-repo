import "./App.css";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <h1>Customer Reward Points</h1>
      <CustomerList />
    </div>
  );
}

export default App;
