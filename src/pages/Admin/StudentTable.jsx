import React, { useState, useEffect } from "react";
import { Printer, Search, XCircle,  ChevronDown, ChevronUp ,LayoutList } from "lucide-react";

const StudentTable = () => {
  // search filter div section
  const [showFilter, setShowFilter] = useState(false);

  
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    image: true, // add image here
    user:false,
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
    gender:false,
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
    "nationality_number",
  ];

  const [searchFields, setSearchFields] = useState(["all"]);
  const [students, setStudents] = useState([]); // State for fetched students
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSearchField = (field) => {
    if (field === "all") {
      setSearchFields(["all"]);
    } else {
      if (searchFields.includes("all")) {
        setSearchFields([field]);
      } else {
        setSearchFields((prev) =>
          prev.includes(field)
            ? prev.filter((f) => f !== field)
            : [...prev, field]
        );
      }
    }
  };

  // Fetch students from API on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://spi-library.onrender.com/user/profile/"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Assuming your API returns an array of student objects:
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    if (!search) return true;

    const fieldsToSearch = searchFields.includes("all")
      ? searchOptions
      : searchFields;

    return fieldsToSearch.some((field) => {
      const value = student[field];
      return (
        value && value.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
  });

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=600");
    if (!printWindow)
      return alert("Pop-up blocked! Please allow pop-ups for this site.");

    const columns = Object.entries(visibleColumns)
      .filter(([_, visible]) => visible)
      .map(([col]) => col);

    const headers = `
    <tr>
      <th>Image</th>
      ${columns.map((col) => `<th>${col.replace(/_/g, " ")}</th>`).join("")}
    </tr>`;

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
        return `<tr>${imgCell}${dataCells}</tr>`;
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

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students: {error}</p>;

  return (
    <div className="p-4 space-y-6">
      {/* Search and Field Filters */}

      <div className="bg-white shadow rounded p-4 space-y-4">
        <div className="flex items-center space-x-4">
          {/* Search Field */}
          <div className="flex items-center w-full  border rounded-lg overflow-hidden shadow-sm">

                {/* Dropdown Button */}
      <button
        className="flex items-center justify-center px-5 py-2 gap-2 border rounded bg-white shadow"
        title="Filter Options"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filter
        {showFilter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-full outline-none"
            />
            <button
              onClick={""}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 transition-colors duration-200"
              title="Search"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={""}
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

        
         {/* Dropdown Filter Box */}
      {showFilter && (
        <div className="w-full p-4 mt-3 grid md:grid-cols-2 lg:grid-cols-7 gap-4 border rounded bg-gray-50 transition-all duration-500">
          
          {["all", ...searchOptions].map((field) => (
            <label
              key={field}
              className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
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
                {field.replace(/_/g, " ").split(' ')[0]}
              </span>
            </label>
          ))}
        </div>
      )}


      </div>

      

   {/* Column Toggle Filters */}
<div className="w-full mt-4 px-6 pt-3 py-2 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm">
  <div className="flex items-center gap-2 mb-4 text-gray-800">
    <LayoutList className="w-5 h-5 text-blue-600" />
    <h3 className="text-lg font-semibold">Show Columns</h3>
  </div>

<div
  className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
  style={{ scrollbarWidth: 'thin', msOverflowStyle: 'none' }} // Firefox + IE
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
      background-color: #000; /* Black */
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
          ${isActive ? 'bg-blue-100 border border-blue-400 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'}
        `}
      >
        {col.replace(/_/g, " ").split(' ')[0]}
      </div>
    );
  })}
</div>


        
        
</div>

      

      {/* Student Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
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
              {visibleColumns.gender && (
                <th className="px-4 py-2">Gender</th>
              )}
              {visibleColumns.address && (
                <th className="px-4 py-2">Address</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                {visibleColumns.image && (
                  <td className="px-4 py-2">
                    <img
                      src={student.image || "https://via.placeholder.com/40"}
                      alt={student.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                )}
                {visibleColumns.user && (
                  <td className="px-4 py-2">{student.user}</td>
                )}
                {visibleColumns.full_name && (
                  <td className="px-4 py-2">{student.full_name}</td>
                )}
                {visibleColumns.email && (
                  <td className="px-4 py-2">{student.email}</td>
                )}
                {visibleColumns.phone && (
                  <td className="px-4 py-2">{student.phone}</td>
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
                  <td className="px-4 py-2">{student.nationality_type.toUpperCase()}{student.nationality_number}</td>
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
