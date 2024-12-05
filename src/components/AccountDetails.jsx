import { useEffect, useState } from "react";
import api from "@/utils/api";

const AccountDetails = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const { data } = await api.get("/dnse-user-service/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccount(data);
      } catch (error) {
        console.error("Failed to fetch account details", error);
      }
    };
    fetchAccountDetails();
  }, []);

  return account ? (
    <div>
      <h2>{account.name}</h2>
      <p>Email: {account.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default AccountDetails;
