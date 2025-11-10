import React, { useState } from "react";
import { FaEnvelope, FaSearch, FaExclamationTriangle, FaRegCalendarAlt } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";

// Mock breach data (you can add more items if you want)
const MOCK_BREACHES = [
  {
    id: 1,
    title: "Adobe",
    domain: "adobe.com",
    description:
      "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text.",
    breachDate: "October 4, 2013",
    status: "Verified",
    accountsAffected: "152,445,165",
    compromisedData: ["Email addresses", "Password hints", "Passwords", "Usernames"],
  },
  {
    id: 2,
    title: "Canva",
    domain: "canva.com",
    description:
      "In May 2019, Canva suffered a data breach affecting 137 million users. Exposed data included names, email addresses, and salted passwords.",
    breachDate: "May 24, 2019",
    status: "Verified",
    accountsAffected: "137,000,000",
    compromisedData: ["Names", "Email addresses", "Passwords"],
  },
];

const DarkWebMonitor = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter an email or domain to search!");
      return;
    }

    // Random mock result
    const random = Math.random();
    if (random < 0.7) {
      setResult(MOCK_BREACHES[Math.floor(Math.random() * MOCK_BREACHES.length)]);
    } else {
      setResult(null);
    }
    setSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-gradient-to-b from-[#0b1120] to-[#111827] text-white">
      {/* --- Header --- */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 text-3xl font-semibold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🛡️ Dark Web Monitor
          </span>
        </div>
        <p className="text-gray-400 mt-2">
          Check if your email or domain has been compromised in data breaches
        </p>
      </div>

      {/* --- Search Box --- */}
      <div className="bg-gradient-to-br from-[#141a2a] to-[#0f172a] p-6 rounded-2xl shadow-lg w-full max-w-7xl">
        {/* Tabs */}
        <div className="flex space-x-3 mb-5">
          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "email"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                : "bg-[#1e293b] text-gray-400 hover:bg-[#334155]"
            }`}
          >
            <FaEnvelope />
            Email
          </button>

          <button
            onClick={() => setActiveTab("domain")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "domain"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                : "bg-[#1e293b] text-gray-400 hover:bg-[#334155]"
            }`}
          >
            <BsGlobe />
            Domain
          </button>
        </div>

        {/* Input + Search */}
        <div className="flex items-center bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 focus-within:border-blue-500 transition">
          <input
            type="text"
            placeholder={
              activeTab === "email"
                ? "Enter email address..."
                : "Enter domain name..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-200 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium flex items-center gap-2 hover:opacity-90 transition"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      {/* --- Results Section --- */}
      {!searched ? (
        <div className="mt-12 bg-gradient-to-br from-[#141a2a] to-[#0f172a] w-full max-w-7xl h-64 rounded-2xl border border-gray-700 flex flex-col items-center justify-center text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold">Start Your Search</h2>
          <p className="text-gray-500 mt-1 text-center">
            Enter an email or domain to check for breaches
          </p>
        </div>
      ) : result ? (
        <div className="mt-12 w-full max-w-7xl">
          {/* --- Warning Banner --- */}
          <div className="rounded-lg border border-red-700 bg-gradient-to-b from-[#3b1216]/60 to-[#2b0e11]/40 p-4 mb-6">
            <div className="flex items-center gap-3 text-red-300">
              <FaExclamationTriangle className="text-xl" />
              <div>
                <div className="text-lg font-semibold text-red-200">
                  1 Breach Found
                </div>
                <div className="text-sm text-red-100/80">
                  Your {activeTab} has been found in 1 data breach. Review the
                  details below and take action to secure your accounts.
                </div>
              </div>
            </div>
          </div>

          {/* --- Breach Info Card --- */}
          <div className="rounded-xl border border-gray-700 bg-gradient-to-b from-[#0f1726] to-[#0b1320] p-6">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="text-xl font-semibold">{result.title}</div>
                <div className="text-gray-400 text-sm">{result.domain}</div>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-300">Accounts Affected</p>
                <p className="text-red-400 font-bold text-lg">
                  {result.accountsAffected}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-800 pt-5 text-gray-300">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-200 mb-2">
                  Description
                </h3>
                <p className="text-sm leading-6">{result.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <FaRegCalendarAlt className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Breach Date</p>
                    <p className="font-medium text-gray-200">
                      {result.breachDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1 mt-3">Status</p>
                  <span className="px-3 py-1 bg-green-700/60 rounded-full text-sm text-green-200">
                    {result.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Compromised Data
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.compromisedData.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800/70 rounded-full text-sm text-gray-300 border border-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // --- No breaches found ---
        <div className="mt-12 bg-gradient-to-br from-[#0f1726] to-[#0b1320] w-full max-w-7xl rounded-2xl border border-green-700 flex flex-col items-center justify-center p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-semibold text-green-400">
            No Breaches Found
          </h2>
          <p className="text-gray-400 mt-2">
            Your {activeTab} appears safe — no records found in our database.
          </p>
        </div>
      )}
    </div>
  );
};

export default DarkWebMonitor;
