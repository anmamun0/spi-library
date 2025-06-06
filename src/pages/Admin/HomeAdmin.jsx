import React from "react";
import {
  Book,
  BookOpen,
  Users,
  Layers,
  ArrowDown,
  ArrowUp,
  ClipboardList,
  Clock,
  LayoutDashboard,
  LoaderCircle
} from "lucide-react";
import DeshboardHead from "../../components/Admin/DeshboardHead";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomeAdmin = () => {
  const { allStudents, allBooks, allTransactions, loading, error } = useLibraryData();
  const navigator = useNavigate();
  
  const today = new Date().toISOString().split('T')[0];

  const uniqueBooksCount = new Set(allBooks?.map(b => b.title)).size;
  const totalCopies = allBooks?.reduce((sum, b) => sum + (b.copies || 0), 0) || 0;
  const availableCopies = allBooks?.reduce((sum, b) => sum + (b.available || 0), 0) || 0;
    const overdueBooks = allTransactions?.filter(txn => txn.return_date && txn.return_date < today).length || 0;
   
 
const borrowedBooks = allTransactions?.filter(txn => txn.status === "borrowed").length || 0;
const borrowedToday = allTransactions?.filter(txn => 
  txn.status === "borrowed" && 
  txn.borrow_date?.split('T')[0] === today
).length || 0;

const returnedBooks = allTransactions?.filter(txn => txn.status === "returned").length || 0;
const returnedToday = allTransactions?.filter(txn => 
  txn.status === "returned" && 
  txn.return_date === today
).length || 0;

const pendingBooks = allTransactions?.filter(txn => txn.status === "pending").length || 0;
const pendingToday = allTransactions?.filter(txn => 
  txn.status === "pending" && 
  txn.request_date?.split('T')[0] === today
).length || 0;



  const dueToday = allTransactions?.filter(txn => txn.return_date === today).length || 0;
  const booksInLibrary = availableCopies;
  const booksWithStudents = totalCopies - availableCopies;
  const categoriesCount = new Set(allBooks?.flatMap(b => b.category?.map(c => c.name))).size;
  const totalStudents = allStudents?.length || 0;

   if (loading)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
<DeshboardHead
        icon={LayoutDashboard}
        heading="Library Admin Dashboard"
        subheading="Overview of all library operations"
      />        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
            <LoaderCircle className="w-8 h-8 animate-spin" />
            <span>Loading student details...</span>
          </div>
        </div>
      </div>
    );
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // Helper: group pending transactions by date and count them
  const pendingByDate = allTransactions
    ?.filter(txn => txn.status === "pending" && txn.request_date)
    .reduce((acc, txn) => {
      const date = txn.request_date.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {}) || {};

  // Prepare data for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i)); // from 6 days ago to today
    return d.toISOString().split('T')[0];
  });

  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: "Pending Requests",
        data: last7Days.map(date => pendingByDate[date] || 0),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        tension: 0.3,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pending Transactions in Last 7 Days' },
    },
    scales: {
      y: { beginAtZero: true, stepSize: 1 },
      x: { grid: { display: false } },
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen py-4 px-4 space-y-8">

    {/* <div className="p-6 space-y-8 max-w-full"> */}
      <DeshboardHead
        icon={LayoutDashboard}
        heading="Library Admin Dashboard"
        subheading="Overview of all library operations"
      />

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  <StatCard icon={<Book size={28} />} label="Unique Books" value={uniqueBooksCount} bg="bg-blue-600" />
  <StatCard icon={<BookOpen size={28} />} label="Total Copies" value={totalCopies} bg="bg-indigo-600" />
  <StatCard icon={<BookOpen size={28} />} label="Available in Library" value={booksInLibrary} bg="bg-emerald-600" />
  <StatCard icon={<Layers size={28} />} label="Categories" value={categoriesCount} bg="bg-pink-600" />

  <StatCard icon={<ArrowUp size={28} />}  label="Borrowed Books"  value={borrowedBooks}  todayCount={borrowedToday} bg="bg-red-600" />
  <StatCard icon={<ArrowDown size={28} />}label="Returned Books" value={returnedBooks} todayCount={returnedToday} bg="bg-green-600" />
  <StatCard icon={<ClipboardList size={28} />} label="Pending Books"  value={pendingBooks} todayCount={pendingToday} bg="bg-orange-600" />

  <StatCard icon={<Users size={28} />} label="Students" value={totalStudents} bg="bg-yellow-600" />
  <StatCard icon={<Clock size={28} />} label="Due Today" value={dueToday} bg="bg-cyan-600" />
  <StatCard icon={<BookOpen size={28} />} label="Book With Students" value={booksWithStudents} bg="bg-purple-600" />
</div>


      <SectionCard title="Top Readers">
        <ul className="text-sm space-y-2">
          {allStudents
            .map(s => ({ name: s.full_name, count: s.total_book_read }))
            .sort((a,b) => b.count - a.count)
            .slice(0,3)
            .map((r, i) => <li key={i}>👤 <strong>{r.name}</strong> — {r.count} books</li>)}
          {!totalStudents && <li>No student data found.</li>}
        </ul>
      </SectionCard>

      <SectionCard title="Overdue Books">
        <ul className="text-sm space-y-2 text-red-600">
          {allTransactions.filter(txn => txn.return_date && txn.return_date < today).slice(0,5).map((txn,i) => (
            <li key={i}>
              📕 Book ID:  <strong>{txn.book}</strong> – overdue by <span className="bg-gray-50 border border-gray-200 border-2 px-2 rounded-md  mouse-pointer" onClick={()=>(navigator(`/admin/students/info/${txn.profile}`))}> student ID</span> <em>{txn.profile}</em>
            </li>
          ))}
          {!overdueBooks && <li>No overdue books.</li>}
        </ul>
      </SectionCard>

      <SectionCard title="Daily Activity Chart">
        <Line data={chartData} options={chartOptions} />
      </SectionCard>
    </div>
  );
};

const StatCard = ({ icon, label, value, bg, todayCount}) => (
  <div className={`relative rounded-2xl p-6 shadow-lg flex flex-col gap-4 transition-transform hover:scale-105 ${bg}`}>
    <div className="flex items-center gap-4">
      <div className="bg-white/20 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-white/80 font-medium">{label}</p>
        <h2 className="text-3xl font-bold text-white">{value}</h2>
      </div>
    </div>
    {typeof todayCount === 'number' && (
      <span className="text-white/70 text-xs mt-auto self-start">
        Today's: <strong>{todayCount}</strong>
      </span>
    )}
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 border hover:shadow-md transition-shadow mb-6">
    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h2>
    {children}
  </div>
);

export default HomeAdmin;
