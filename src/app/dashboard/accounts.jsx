import { useState, useEffect } from "react";
import api from "@/utils/api";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("jwt_token");
      const { data } = await api.get("/dnse-order-service/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <ul>
      {accounts.map((acc) => (
        <li key={acc.id}>{acc.name}</li>
      ))}
    </ul>
  );
};

export default Accounts;
