import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { loginService } from "../service/authService";
import { useAuth } from "../context/AuthContext";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const user = await loginService(email, password);

      login(user);

      navigate("/admin/blogs");
    } catch (error) {
      console.error("LOGIN GAGAL:", error);
      setError("Email atau password salah.");
    }
  };
  

  return (
    <main className="min-h-screen bg-white px-6 py-24 text-[#071A33]">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full pt-24">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#071A33]/45">
              Revisual Production
            </p>

            <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              WELCOME BACK.
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#071A33]/55">
              Sign in to manage your Revisual Production content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-12 w-full rounded-xl border border-[#071A33]/10 bg-white px-4 text-sm outline-none transition focus:border-[#071A33]/40"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#071A33] text-sm font-medium text-white transition hover:bg-[#0B2545]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
