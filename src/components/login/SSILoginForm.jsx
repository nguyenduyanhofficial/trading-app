import { useState } from "react";

export function SSILoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, clientId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Tên đăng nhập SSI"
        className="p-2 border rounded w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="p-2 border rounded w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mã khách hàng SSI"
        className="p-2 border rounded w-full"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Đăng nhập SSI
      </button>
    </form>
  );
}
