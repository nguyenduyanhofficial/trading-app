"use client";

import { useRouter } from "next/navigation";
import { useTradingService } from "@/hooks/use-trading";
import { LoginForm } from "@/components/login/LoginForm";
import { saveBrokerChoice } from "@/utils/broker";
import { setCookie } from "@/utils/cookies";

export default function Login() {
  const { login } = useTradingService();
  const router = useRouter();

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData.username, formData.password);
      setCookie("jwt_token", res.token);

      // Chỉ cần truyền broker
      saveBrokerChoice(formData.broker);

      router.push("/dashboard");
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="mb-8 text-2xl font-semibold">Đăng nhập</h1>
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
