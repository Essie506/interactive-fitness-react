export default function Login() {
  return (
    <main className="flex flex-col items-center text-center min-h-screen bg-gradient-to-br from-[#dff9fb] to-[#c7ecee] p-6">

      <img src="/logo.png" alt="Logo" className="w-40 mb-6" />

      <h1 className="text-3xl font-bold text-[#079992] mb-6">
        Move. Train. Connect.
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-xs">

        <input
          type="email"
          placeholder="Email"
          className="input-field border border-[#cfeeee] rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field border border-[#cfeeee] rounded-lg p-3"
        />

        <button
          className="bg-[#e0f7f7] text-[#079992] px-5 py-3 rounded-xl font-bold hover:bg-[#c7ecee] transition"
          onClick={() => (window.location.href = "/home")}
        >
          Login
        </button>

        <div className="text-sm text-[#079992]">
          <a href="#" className="hover:underline">Create Account</a> |{" "}
          <a href="#" className="hover:underline">Forgot Password?</a>
        </div>
      </div>

      <footer className="mt-10 text-[#079992] font-bold">
        © 2025 Interactive Fitness — All Rights Reserved
      </footer>
    </main>
  );
}
