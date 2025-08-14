import React, { useState } from "react";
import { CalendarDays, FileText } from "lucide-react";
import { useBooks } from "../context/BookContext";

export default function Notice() {
  const { notices, loading, error } = useBooks();
  const [showAll, setShowAll] = useState(false);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-sm text-center text-gray-600 text-lg">
        লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 bg-red-100 rounded-lg shadow-sm text-center text-red-700 text-lg font-semibold">
        An error occurred: {error.message || error.toString()}
      </div>
    );
  }

  if (!notices || notices.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 bg-yellow-100 rounded-lg shadow-sm text-center text-yellow-800 text-lg font-semibold">
        No notices found.
      </div>
    );
  }

  // ডিফল্ট ২০ টা নোটিশ দেখাবে, যদি showAll সত্য না হয়
  const displayedNotices = showAll ? notices : notices.slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-sm pb-24">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wide">
        ডিপ্লোমা পর্যায়ের কারিকুলামের নোটিশ
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="text-left py-3 px-6 uppercase font-semibold text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" /> তারিখ
                </div>
              </th>
              <th className="text-left py-3 px-6 uppercase font-semibold text-sm md:text-base">
                নোটিশের শিরোনাম
              </th>
              <th className="text-center py-3 px-6 uppercase font-semibold text-sm md:text-base">
                PDF দেখুন
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {displayedNotices.map((notice, index) => (
              <tr
                key={index}
                className="hover:bg-indigo-50 transition cursor-pointer"
                title={notice.title}
              >
                <td className="py-4 px-6 text-gray-700 whitespace-nowrap font-medium">
                  {notice.date}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    aria-label={`নোটিশ: ${notice.title}`}
                  >
                    {notice.title}
                  </a>
                </td>
                <td className="py-4 px-6 text-center">
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-indigo-600 hover:text-indigo-800"
                    aria-label={`View PDF for notice dated ${notice.date}`}
                  >
                    <FileText className="w-6 h-6" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View All / Show Less বাটন */}
      {notices.length > 20 && (
        <div className="text-right mt-8 px-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className=" text-gray-700 hover:text-gray-800 font-semibold px-6 py-2 rounded-md transition"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
