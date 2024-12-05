import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("jwt_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return children;
}
