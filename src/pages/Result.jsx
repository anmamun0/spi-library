import React, { useState } from "react";
import {
  Search,
  Loader2,
  FileSearch,
  BookOpenCheck,
  CalendarDays,
  BadgeAlert,
  User2,
  ClipboardSignature,
  Landmark
} from "lucide-react";

const examOptions = [
  "Diploma In Engineering",
  "Diploma In Engineering (Army)",
  "Diploma In Engineering (Naval)",
  "Diploma In Tourism And Hospitality",
  "Diploma In Textile Engineering",
  "Diploma In Agriculture",
  "Diploma In Fisheries",
  "Diploma In Forestry",
  "Diploma In Livestock",
  "Diploma In Medical Technoloy",
  "Certificate In Medical Ultrasound",
  "Diploma In Commerce",
  "Certificate In Marine Trade",
  "Advanced Certificate Course",
  "National Skill Standard Basic Certificate Course",
  "HSC (Business Management)",
  "HSC Cvtocational"
];

const regulationYears = [2010, 2016, 2022];

function timeSince(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return "just now";
}

export default function Result() {
  const [roll, setRoll] = useState("");
  const [exam, setExam] = useState("Diploma In Engineering");
  const [regulation, setRegulation] = useState("2022");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchResult = async () => {
    if (!roll) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://btebresultszone.com/api/results/individual?roll=${roll}&exam=${encodeURIComponent(
          exam
        )}&regulation=${regulation}`
      );
      if (!res.ok) throw new Error("Failed to fetch result");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className=" bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex items-center justify-center gap-2 text-blue-600 text-2xl font-semibold">
            <Search className="w-6 h-6" /> Search Result
          </div>

          <input
            type="text"
            placeholder="Enter Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {examOptions.map((option, idx) => (
              <option key={idx} value={option} className="text-sm">{option}</option>
            ))}
          </select>

          <select
            value={regulation}
            onChange={(e) => setRegulation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {regulationYears.map((year, idx) => (
              <option key={idx} value={year} className="text-sm">{year}</option>
            ))}
          </select>

          <button
            onClick={fetchResult}
            disabled={loading || !roll}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />} Fetch Result
          </button>

          {error && <p className="text-red-600 text-center font-medium">❌ {error}</p>}
        </div>

        {/* Result Section */}
        {result && (
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="border-b border-blue-200 pb-4 mb-4">
              <div className="flex items-center gap-3 text-blue-700 text-xl font-semibold">
                <FileSearch className="w-6 h-6" /> Student Information
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <div className="flex items-center gap-3">
                  <User2 className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{result.student_name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ClipboardSignature className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{result.roll}</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <Landmark className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{result.institute?.name || "N/A"} ({result.institute?.code})</span>
                </div>
              </div>
            </div>

            {result.semester_results?.map((sem, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <BookOpenCheck className="w-5 h-5 text-indigo-500" /> Semester {sem.semester}
                </div>
                {sem.exam_results?.map((res, i) => {
                  const dateObj = new Date(res.date);
                  const isThisMonth =
                    dateObj.getMonth() === currentMonth && dateObj.getFullYear() === currentYear;

                  return (
                    <div key={i} className="ml-4 text-sm space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>Published on: {dateObj.toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm font-medium text-blue-700">
                          {timeSince(dateObj)}
                        </div>
                      </div>
                      {res.gpa && (
                        <div className="text-center text-2xl font-bold text-green-600 bg-green-100 py-2 rounded-md shadow">
                          GPA: {res.gpa}
                        </div>
                      )}
                      {res.reffereds?.length > 0 && (
                        <div className="flex items-start gap-2 text-red-600">
                          <BadgeAlert className="w-4 h-4 mt-0.5" />
                          <div>
                            <div className="font-medium">Referred Subjects:</div>
                            <ul className="list-disc list-inside ml-4">
                              {res.reffereds.map((subj, index) => (
                                <li key={index}>
                                  <span className="font-semibold text-gray-700">{subj.subject_code}</span> - {subj.subject_name} ({subj.reffered_type})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
              )}
              
{!result && (
  <div className="md:col-span-2 flex flex-col items-center justify-center h-full p-10 text-gray-500 space-y-6">
    <FileSearch className="w-16 h-16 mb-2 text-gray-500 animate-pulse" />
    <h3 className="text-2xl font-semibold text-gray-700">Welcome!</h3>
    <p className="text-center text-lg max-w-md">
      Enter your roll number and select your exam & regulation, then click{" "}
      <span className="font-semibold text-blue-600">Fetch Result</span> to view your academic performance.
    </p>
   
  </div>
)}


              
      </div>
    </div>
  );
}
