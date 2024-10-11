import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const BodyData = {
      mail: email,
      password: password,
    };

    try {
      const response = await fetch("api/Data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BodyData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log(response.status, response.statusText);
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
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-whihte">
      <div className="bg-transparent shadow-lg rounded px-8 py-6 w-96">
        <h2 className="text-4xl font-bold font-mono text-black text-center mb-10">
          <span className="text-blue-600">L</span>ogin
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
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
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
              placeholder="$#%?/*@"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-500 focus:border-blue-500"
              placeholder="$#%?/*@"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 flex gap-3 justify-center items-center text-white mt-10 font-bold py-2 px-4 rounded w-1/2 hover:bg-blue-700 transition duration-300"
            >
              {success ? (
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
