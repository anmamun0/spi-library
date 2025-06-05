import React, { useEffect, useState } from "react";
import { Search, ClipboardList } from "lucide-react";

import axios from "axios";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { Link } from "react-router-dom";

const BorrowRecords = () => {
  const { allStudents, allBooks, allTransactions, loading, error } =
    useLibraryData();

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

  const handleAccept = (id) => {
    alert(`Accepting request ID: ${id}`);
    // TODO: Send PATCH request to update status to 'borrowed'
  };

  const handleReceived = (id) => {
    alert(`Marking as received ID: ${id}`);
    // TODO: Send PATCH request to update status to 'returned'
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

  if (loading) {
    return <div className="p-4 text-gray-600">Loading transactions...</div>;
  }

  return (
    <div className="p-4 space-y-4 max-w-full">
      <div className="">
        <div className="flex items-center justify-between bg-white border border-gray-200 shadow-md rounded-xl px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <ClipboardList size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Transaction Records
              </h1>
              <p className="text-sm text-gray-500">
                Track all borrowing and returning activities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between ">
        <div className="flex flex-wrap items-center  gap-3 ">
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
          <p className="text-xs text-gray-500 mb-4 flex gap-2">
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
                    <span>
                    {tx.id}{" "}
                    </span>
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
                        onClick={() => handleAccept(tx.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Accept
                      </button>
                    )}
                    {tx.status === "borrowed" && (
                      <button
                        onClick={() => handleReceived(tx.id)}
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
        <p className="font-semibold mb-1">🔍 Search Guidelines:</p>
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
