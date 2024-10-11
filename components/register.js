import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaLock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import "tailwindcss/tailwind.css";
import "../app/style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false); 
      return;  
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false); 
      return;
    }

    const BodyData = {
      mail: email,
      password: password,
    };

    try {
      const response = await fetch("/api/Data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BodyData),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");

      setTimeout(() => {
        window.location.href = "https://forms.gle/ohEG2zF6mvJnoUyDA";
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center bg-center h-screen">
      <div className="bg-black bg-opacity-20 bg-cover images shadow-lg border border-gray-300 rounded-lg px-8 py-6 w-96">
        <h2 className="text-4xl font-bold font-mono text-black text-center mb-10">
          <span className="text-blue-600">L</span>ogin
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
              placeholder="Team-Leader@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`flex gap-3 justify-center items-center text-white mt-10 font-bold py-2 px-4 rounded w-1/2 transition duration-300 ${
                success
                  ? "bg-green-600 hover:bg-green-700"
                  : error
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading} 
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin" /> Loading...
                </>
              ) : success ? (
                <>
                  <ImSpinner2 className="animate-spin" /> Redirecting
                </>
              ) : error ? (
                <>
                  Error <FaExclamationTriangle className="text-red-900 shake" />
                </>
              ) : (
                <>
                  Submit <FaLock size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
