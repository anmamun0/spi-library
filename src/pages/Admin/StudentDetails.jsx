import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  User2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BadgeCheck,
  Fingerprint,
  BookOpenCheck,
  ShieldCheck
} from 'lucide-react';
import { useLibraryData } from "../../context/Admin/useLibraryData";

const StudentDetails = () => {
  const { allStudents, allBooks, allTransactions, loading, error } = useLibraryData();
  
  const { profile_id }= useParams(); 
  const [student, setStudent] = useState(null); 
const [studentTransactions, setStudentTransactions] = useState([]);

useEffect(() => {
  if (!loading && allStudents && allTransactions && profile_id) {
    const found = allStudents.find(
      (item) => String(item.id) === String(profile_id)
    );
    setStudent(found || null);

    const filteredTransactions = allTransactions.filter(
      (tx) => String(tx.profile) === String(profile_id)
    );
    setStudentTransactions(filteredTransactions);
  }
}, [allStudents, allTransactions, profile_id, loading]);

  
// While loading or data not ready, show loader
if (loading || !allStudents || allStudents.length === 0) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
        <LoaderCircle className="w-8 h-8 animate-spin" />
        <span>Loading student details...</span>
      </div>
    </div>
  );
}

// If student not found AFTER data is loaded
if (!student) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 font-semibold">Student not found!</div>
    </div>
  );
}
 
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={student.image}
            alt="Student"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md"
          />
          <div className="flex-1 space-y-3">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <User2 size={24} /> {student.full_name}
            </h2>
            <p className="text-gray-500 capitalize text-sm">{student.role}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm mt-4">
              <p className="flex items-center gap-2">
                <Mail size={16} /> {student.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {student.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {student.address}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} /> DOB: {student.birthday}
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
          <div className="space-y-2">
            <p><strong>Username:</strong> {student.user}</p>
            <p><strong>Roll:</strong> {student.roll}</p>
            <p><strong>Registration:</strong> {student.registration}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Session:</strong> {student.session}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Blood Group:</strong> {student.blood}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} /> <strong>Nationality:</strong> {student.nationality_type}
            </p>
            <p className="flex items-center gap-2">
              <Fingerprint size={16} /> <strong>National ID:</strong> {student.nationality_number}
            </p>
            <p><strong>Last Login:</strong> {new Date(student.last_login).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <BookOpenCheck size={18} className="text-green-600" />
            <span><strong>Total Books Read:</strong> {student.total_book_read}</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-yellow-500" />
            <span><strong>Rating:</strong> {student.rating}</span>
          </div>
        </div>

        
      </div>
      <div className="mt-12 p-2">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Student Transactions</h3>
  {studentTransactions.length === 0 ? (
    <p className="text-sm text-gray-500">No transactions found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-100 text-left text-sm text-gray-700 uppercase">
            <th className="py-2 px-4">Tr ID</th>
            <th className="py-2 px-4">Book ID</th>
            <th className="py-2 px-4">Request Date</th>
            <th className="py-2 px-4">Borrow Date</th>
            <th className="py-2 px-4">Return Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Due (days)</th>
            <th className="py-2 px-4">Warning</th>
          </tr>
        </thead>
        <tbody>
          {studentTransactions.map((tx, idx) => (
            <tr key={tx.id} className="border-t text-sm">
              <td className="py-2 px-4">{tx.id}</td>
              <td className="py-2 px-4">{tx.book}</td>
              <td className="py-2 px-4">{new Date(tx.request_date).toLocaleString()}</td>
              <td className="py-2 px-4">{tx.borrow_date ? new Date(tx.borrow_date).toLocaleString() : '-'}</td>
              <td className="py-2 px-4">{tx.return_date ? new Date(tx.return_date).toLocaleString() : '-'}</td>
              <td className="py-2 px-4 capitalize">{tx.status}</td>
              <td className="py-2 px-4">{tx.due_date} days</td>
              <td className="py-2 px-4">{tx.warning || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
};

export default StudentDetails;
