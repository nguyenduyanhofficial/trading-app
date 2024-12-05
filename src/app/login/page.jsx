"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTradingService } from "@/hooks/use-trading";
import { setCookie } from "@/utils/cookies";

export default function Login() {
  const { login } = useTradingService();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      setCookie("jwt_token", res.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="mb-4 text-2xl font-semibold">Đăng nhập</h1>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        className="p-2 mb-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Đăng nhập
      </button>
    </div>
  );
}
