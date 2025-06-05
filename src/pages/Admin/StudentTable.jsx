import React, { useState, useEffect } from "react";
import {
  Printer,
  Search,
  XCircle,
  ChevronDown,
  ChevronUp,
  LayoutList,
  LoaderCircle,
  GraduationCap 
} from "lucide-react";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const { allStudents, allBooks, allTransactions, loading, error } = useLibraryData();
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/students/info/${id}`);
  };
  // search filter div section
  const [showFilter, setShowFilter] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]); // stores all previous queries

  const [visibleColumns, setVisibleColumns] = useState({
    image: true, // add image here
    user: false,
    full_name: true,
    email: true,
    phone: true,
    department: true,
    roll: true,
    registration: true,
    session: true,
    blood: false,
    birthday: false,
    nationality_number: false,
    gender: false,
    address: false,
  });

  const searchOptions = [
    "full_name",
    "email",
    "phone",
    "department",
    "roll",
    "registration",
    "session",
    "blood",
    "birthday",
    "address",
    "gender",
    "nationality_type",
    "nationality_number",
  ];

  const [searchFields, setSearchFields] = useState(["all"]);
  const [students, setStudents] = useState([]); // State for fetched students 

  const toggleSearchField = (field) => {
    if (searchFields[0] === field) {
      setSearchFields([]); // Deselect if same
    } else {
      setSearchFields([field]); // Set only the selected one
    }
  };

  // Fetch students from API on component mount
  useEffect(() => {
     
        setStudents(allStudents);
 
  }, [loading]);

  const filteredStudents = searchHistory.reduce((result, filterItem) => {
    const { query, fields } = filterItem;

    return result.filter((student) =>
      fields.some((field) => {
        const value = student[field];
        return value && value.toString().toLowerCase().includes(query);
      })
    );
  }, students); // start with full list

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=600");
    if (!printWindow)
      return alert("Pop-up blocked! Please allow pop-ups for this site.");

    const columns = Object.entries(visibleColumns)
      .filter(([_, visible]) => visible && _ != "image")
      .map(([col]) => col);

    const headers = `<tr> <th>Image</th> ${columns
      .map((col) => `<th>${col.replace(/_/g, " ")}</th>`)
      .join("")} </tr>`;

    const rows = filteredStudents
      .map((student) => {
        const imgCell = `<td><img src="${
          student.image || "https://via.placeholder.com/40"
        }" alt="${
          student.full_name
        }" style="width:40px;height:40px;border-radius:50%;object-fit:cover"/></td>`;

        const dataCells = columns
          .map((col) => `<td>${student[col] || ""}</td>`)
          .join("");

        if (visibleColumns["image"]) {
          return `<tr>${imgCell}${dataCells}</tr>`;
        }
        return `<tr>${dataCells}</tr>`;
      })
      .join("");

    const html = `
    <html>
      <head>
        <title>Print Students</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background: #f0f0f0;
          }
          img {
            display: block;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <h2>Filtered Students</h2>
        <table>
          <thead>${headers}</thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>`;

    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.focus();

    // Trigger print, then delay closing the window by 500ms
    printWindow.print();

    setTimeout(() => {
      // Comment this line out if you want to let user close window manually
      printWindow.close();
    }, 500);
  };

  if (loading)
    return (
      <div>
        <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
          <LoaderCircle className="w-8 h-8 animate-spin" />
          <span>Loading students data...</span>
        </div>
      </div>
    );

  if (error) return <p className="py-6 ">Error loading students: {error}</p>;

  return (
    <div className="p-4 space-y-6">
      {/* Search and Field Filters */}
<div className="">
  <div className="flex items-center justify-between bg-white border border-gray-200 shadow-md rounded-xl px-6 py-4">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <GraduationCap size={28} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
        <p className="text-sm text-gray-500">Manage and view all registered students and find user </p>
      </div>
    </div>
  </div>
</div>
      
      <div className=" rounded   space-y-4">
        <div className="flex items-center space-x-4">
          {/* Search Field */}
          <div className="flex items-center w-full  border rounded-lg overflow-hidden shadow-sm">
            {/* Dropdown Button */}
            <button
              className="flex items-center justify-center px-5 py-2 gap-2 border rounded shadow"
              title="Filter Options"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              Filter
              {showFilter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <input
              type="text"
              placeholder="Search students..."
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              className="px-4 py-2 w-full outline-none"
            />

            <button
              onClick={() => {
                if (!inputSearch.trim()) return;

                setSearchHistory((prev) => [
                  ...prev,
                  {
                    query: inputSearch.toLowerCase(),
                    fields: searchFields.includes("all")
                      ? searchOptions
                      : searchFields,
                  },
                ]);
                setInputSearch(""); // clear after search
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 transition-colors duration-200"
              title="Search"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearchHistory([]);
              setInputSearch("");
              setSearchFields(["all"]);
            }}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
            title="Reset Filter"
          >
            <XCircle size={18} />
            <span>Reset</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
            title="Print Filtered Students"
          >
            <Printer size={18} />
            <span>Print</span>
          </button>
        </div>

        {/* Search action view like tags */}
        <div>
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
              {searchHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 px-3 py-1 rounded shadow flex items-center gap-1  uppercase"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{item.query}</span> in{" "}
                  {item.fields.join(", ")}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Filter Box */}
        {showFilter && (
          <div className="w-full p-3   flex flex-wrap gap-4 border rounded bg-gray-50 transition-all duration-500 text-sm">
            {["all", ...searchOptions].map((field) => (
              <label
                key={field}
                className="flex items-center gap-3   border rounded-lg px-2 py-1 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={
                    field === "all"
                      ? searchFields.includes("all")
                      : searchFields.includes(field)
                  }
                  onChange={() => toggleSearchField(field)}
                  className="cursor-pointer"
                />
                <span className="capitalize select-none">
                  {field.replace(/_/g, " ")}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Column Toggle Filters */}
      <div className="w-full mt-4 p-5  rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-50 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <LayoutList className="w-5 h-5 text-blue-600" />
          <h3 className="text-md font-semibold">Show Columns</h3>
          <span> Available ({filteredStudents.length})</span>
        </div>

        <div
          className="flex gap-3 overflow-x-auto py-2  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }} // Firefox + IE
        >
          <style>
            {`
    /* Thin scrollbar with black thumb for Chrome, Safari and Opera */
    div::-webkit-scrollbar {
      height: 2px;
    }
    div::-webkit-scrollbar-track {
      background: transparent;
    }
    div::-webkit-scrollbar-thumb {
      background-color: #e5e7eb; /* Black */
      border-radius: 8px;
    }

    /* Firefox scrollbar (optional for full support) */
    div {
      scrollbar-width: thin;
      scrollbar-color: #e5e7eb transparent;
    }
  `}
          </style>

          {Object.keys(visibleColumns).map((col) => {
            const isActive = visibleColumns[col];
            return (
              <div
                key={col}
                onClick={() => toggleColumn(col)}
                className={`flex-shrink-0 flex items-center justify-center gap-2 text-sm rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition cursor-pointer select-none font-medium
          ${
            isActive
              ? "bg-blue-100 border border-blue-400 text-blue-700"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
              >
                {col.replace(/_/g, " ")}
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto  rounded-lg px-2">
        <table className="min-w-full text-sm text-left border ">
          <thead className="bg-gray-300 border-b border-gray-300 ">
            <tr>
              {visibleColumns.image && <th className="px-4 py-3">Image</th>}
              {visibleColumns.user && <th className="px-4 py-2">Username</th>}
              {visibleColumns.full_name && <th className="px-4 py-2">Name</th>}
              {visibleColumns.email && <th className="px-4 py-2">Email</th>}
              {visibleColumns.phone && <th className="px-4 py-2">Phone</th>}
              {visibleColumns.department && (
                <th className="px-4 py-2">Department</th>
              )}
              {visibleColumns.roll && <th className="px-4 py-2">Roll</th>}
              {visibleColumns.registration && (
                <th className="px-4 py-2">Reg No.</th>
              )}
              {visibleColumns.session && <th className="px-4 py-2">Session</th>}
              {visibleColumns.blood && <th className="px-4 py-2">Blood</th>}
              {visibleColumns.birthday && (
                <th className="px-4 py-2">Birthday</th>
              )}
              {visibleColumns.nationality_number && (
                <th className="px-4 py-2">Nationality</th>
              )}
              {visibleColumns.gender && <th className="px-4 py-2">Gender</th>}
              {visibleColumns.address && <th className="px-4 py-2">Address</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50" >
                {visibleColumns.image && (
                  <td className="px-4 py-2"  onClick={() => handleRowClick(student.id)}>
                    <img
                      src={student.image || "https://via.placeholder.com/40"}
                      alt={student.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />{" "} 
                  </td>
                )}
                {visibleColumns.user && (
                  <td className="px-4 py-2"  onClick={() => handleRowClick(student.id)}>{student.user}</td>
                )}
                {visibleColumns.full_name && (
                  <td className="px-4 py-2"  onClick={() => handleRowClick(student.id)}>{student.full_name}</td>
                )}
                {visibleColumns.email && (
                  <td className="px-4 py-2"  onClick={() => handleRowClick(student.id)}>{student.email}</td>
                )}
                {visibleColumns.phone && (
                  <td className="px-4 py-2"  onClick={() => handleRowClick(student.id)}>{student.phone}</td>
                )}
                {visibleColumns.department && (
                  <td className="px-4 py-2">{student.department}</td>
                )}
                {visibleColumns.roll && (
                  <td className="px-4 py-2">{student.roll}</td>
                )}
                {visibleColumns.registration && (
                  <td className="px-4 py-2">{student.registration}</td>
                )}
                {visibleColumns.session && (
                  <td className="px-4 py-2">{student.session}</td>
                )}
                {visibleColumns.blood && (
                  <td className="px-4 py-2">{student.blood}</td>
                )}
                {visibleColumns.birthday && (
                  <td className="px-4 py-2">{student.birthday}</td>
                )}
                {visibleColumns.nationality_number && (
                  <td className="px-4 py-2">
                    {student.nationality_type.toUpperCase()}
                    {student.nationality_number}
                  </td>
                )}
                {visibleColumns.gender && (
                  <td className="px-4 py-2">{student.gender}</td>
                )}
                {visibleColumns.address && (
                  <td className="px-4 py-2">{student.address}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
