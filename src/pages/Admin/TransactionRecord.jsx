import React, { useEffect, useState } from "react";
import { Search, ClipboardList, CheckCircle ,LoaderCircle } from "lucide-react";

import axios from "axios";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { Link } from "react-router-dom";
import DeshboardHead from "../../components/Admin/DeshboardHead";

const BorrowRecords = () => {
  const { allStudents, allBooks, allTransactions, loading, error } =
    useLibraryData();

  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string } or null

  const handleTransaction = async (tr_id, transaction) => {
    try {
  const token = localStorage.getItem("token_id");

      await axios.patch(
        `https://spi-library.onrender.com/transaction/transactions/${tr_id}/`,
        {
          status: transaction, //  borrowed or "returned"
        },
        {
          headers: {
            Authorization: `Token ${token}`, // admin token auth
          },
        }
      );

      setMessage({
        type: "success",
        text: `Transaction #${tr_id} updated successfully!`,
        id: `${tr_id}`,
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
      const detail =
        error.response?.data?.detail || "Failed to update transaction.";
      setMessage({ type: "error", text: detail, id: `${tr_id}` });
    }
  };

  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch students from API on component mount
  useEffect(() => {
    setTransactions(allTransactions);
  }, [loading]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const getFiltered = (status) => {
    const [column, ...valueParts] = searchTerm.trim().split(" ");
    const value = valueParts.join(" ").toLowerCase();

    return transactions
      .filter((tx) => tx.status === status)
      .filter((tx) => {
        if (!column) return true; // No filter applied

        if (!value) {
          // If only one word is entered, do global search
          const search = column.toLowerCase();
          return (
            tx.id.toString().includes(search) ||
            tx.book?.toLowerCase().includes(search) ||
            formatDate(tx.request_date).includes(search) ||
            formatDate(tx.borrow_date).includes(search) ||
            formatDate(tx.return_date).includes(search) ||
            (tx.due_date && tx.due_date.toString().includes(search)) ||
            (tx.warning !== null && tx.warning.toString().includes(search))
          );
        }

        // Column-specific filtering
        switch (column.toLowerCase()) {
          case "id":
            return tx.id.toString().includes(value);
          case "book":
            return tx.book?.toLowerCase().includes(value);
          case "request":
          case "request_date":
            return formatDate(tx.request_date).includes(value);
          case "borrow":
          case "borrow_date":
            return formatDate(tx.borrow_date).includes(value);
          case "return":
          case "return_date":
            return formatDate(tx.return_date).includes(value);
          case "due":
          case "due_date":
            return tx.due_date?.toString().includes(value);
          case "warning":
            return tx.warning !== null && tx.warning.toString().includes(value);
          default:
            return false;
        }
      });
  };

  if (loading)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <DeshboardHead icon={ClipboardList}  heading="Transaction Records" subheading="Track all borrowing and returning activities"/>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
            <LoaderCircle className="w-8 h-8 animate-spin" />
            <span>Loading student details...</span>
          </div>
        </div>
      </div>
    );

  if (error) return <p className="py-6 ">Error loading students: {error}</p>;

  return (
    <div className="p-4 space-y-4 max-w-full">
      <DeshboardHead
        icon={ClipboardList}
        heading="Transaction Records"
        subheading="Track all borrowing and returning activities"
      />

      {/* Tabs */}
      <div className="lg:flex justify-between ">
        <div className="flex  items-center  gap-3 ">
          {["pending", "borrowed", "returned"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md border text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm  ">
          <p className="text-xs text-gray-500 mb-4 md:flex gap-2">
            <span className="font-medium flex gap-2">
              <Search size={18} />
              Tip:
            </span>{" "}
            Use{" "}
            <code className="bg-white px-1 py-0.5 -mt-1 rounded border border-gray-300 text-gray-700">
              column_name value
            </code>{" "}
            format for specific searches.
          </p>
          <input
            type="text"
            placeholder='e.g., "book Python", "warning 7", or just "Python"'
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction Notification message */}
      {message && message.type === "success" && (
        <div className="mb-4">
          <div className="mt-3 flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded border border-green-400">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="space-y-0.5">
              <p className="font-semibold">{message.text}</p>
              <p className="text-xs text-green-700 italic">
                Transaction ID:{" "}
                <span className="font-medium not-italic">{message.id}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {message && message.type === "error" && (
        <div className="mb-4">
          <div className="mt-3 flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded border border-red-400">
            {/* You can replace with an error icon from react-lucide */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="space-y-0.5">
              <p className="font-semibold">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Book</th>
              <th className="px-4 py-2 border">Request</th>
              <th className="px-4 py-2 border">Borrow</th>
              <th className="px-4 py-2 border">Return</th>
              <th className="px-4 py-2 border">Due</th>
              <th className="px-4 py-2 border">Warning</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {getFiltered(activeTab).length > 0 ? (
              getFiltered(activeTab).map((tx, idx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border flex justify-between gap-2">
                    <span>{tx.id} </span>
                    <Link
                      to={`/admin/students/info/${tx.profile}/?transaction=${tx.id}`}
                      className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition"
                    >
                      User
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">{tx.book}</td>
                  <td className="px-4 py-2 border">
                    {formatDate(tx.request_date)}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatDate(tx.borrow_date)}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatDate(tx.return_date)}
                  </td>
                  <td className="px-4 py-2 border">{tx.due_date}</td>
                  <td className="px-4 py-2 border text-center">
                    {tx.warning !== null ? (
                      <span
                        className={
                          tx.warning < 0
                            ? "text-red-600 font-medium"
                            : "text-green-600 font-medium"
                        }
                      >
                        {tx.warning >= 0 ? `+${tx.warning}` : tx.warning}d
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {tx.status === "pending" && (
                      <button
                        onClick={() => handleTransaction(tx.id, "borrowed")}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Accept
                      </button>
                    )}
                    {tx.status === "borrowed" && (
                      <button
                        onClick={() => handleTransaction(tx.id, "returned")}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Received
                      </button>
                    )}
                    {tx.status === "returned" && (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Search Guidelines */}
      <div className="w-full bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md text-sm mt-24">
        <p className="font-semibold mb-1"> Search Guidelines:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            To search by a specific column, use the format:{" "}
            <code className="bg-white px-1 py-0.5 rounded border">
              column_name value
            </code>
          </li>
          <li>
            <strong>Examples:</strong>
          </li>
          <ul className="ml-4 list-[circle]">
            <li>
              <code className="bg-white px-1 py-0.5 rounded border">
                book Python
              </code>{" "}
              → finds books containing "Python"
            </li>
            <li>
              <code className="bg-white px-1 py-0.5 rounded border">
                warning 7
              </code>{" "}
              → finds records where warning is 7
            </li>
            <li>
              <code className="bg-white px-1 py-0.5 rounded border">
                request 2025
              </code>{" "}
              → filters request date containing "2025"
            </li>
          </ul>
          <li>
            If you enter only one word (e.g.,{" "}
            <code className="bg-white px-1 py-0.5 rounded border">Python</code>
            ), it will search across all columns.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BorrowRecords;
