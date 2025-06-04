import React from 'react';
import {
  Book,
  BookOpen,
  Users,
  Layers,
  ArrowDown,
  ArrowUp,
  DollarSign,
  BarChart2,
  ClipboardList,
  Clock,
} from 'lucide-react';

const HomeAdmin = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">📚 Library Admin Dashboard</h1>

      {/* 🧮 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Book size={28} />} label="Unique Books" value="123" bg="bg-blue-100" />
        <StatCard icon={<BookOpen size={28} />} label="Total Copies" value="840" bg="bg-indigo-100" />
        <StatCard icon={<ArrowUp size={28} />} label="Issued Books" value="450" bg="bg-red-100" />
        <StatCard icon={<ArrowDown size={28} />} label="Returned Books" value="390" bg="bg-green-100" />
        <StatCard icon={<Users size={28} />} label="Total Students" value="120" bg="bg-yellow-100" />
        <StatCard icon={<Layers size={28} />} label="Categories" value="20" bg="bg-pink-100" />
        <StatCard icon={<DollarSign size={28} />} label="Monthly Earnings" value="$5,963" bg="bg-emerald-100" />
      </div>

      {/* 📝 Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <SummaryCard label="Published Projects" value="532" percent="+1.69%" icon={<BarChart2 size={24} />} trend="up" />
        <SummaryCard label="Completed Tasks" value="4569" percent="-0.5%" icon={<ClipboardList size={24} />} trend="down" />
        <SummaryCard label="Successful Tasks" value="89%" percent="+0.99%" icon={<BarChart2 size={24} />} trend="up" />
        <SummaryCard label="Ongoing Projects" value="365" percent="+0.35%" icon={<Clock size={24} />} trend="up" />
      </div>

      {/* 📘 Recent Issued Books */}
      <SectionCard title="Recently Issued Books">
        <ul className="text-sm space-y-2">
          <li><strong>Data Structures</strong> issued to <em>Rahim</em> on 2025-06-01</li>
          <li><strong>Python Crash Course</strong> issued to <em>Karim</em> on 2025-06-02</li>
          {/* More... */}
        </ul>
      </SectionCard>

      {/* 👤 Top Readers */}
      <SectionCard title="Top Readers">
        <ul className="text-sm space-y-2">
          <li>👤 <strong>Ayesha</strong> — 18 books</li>
          <li>👤 <strong>Tanvir</strong> — 15 books</li>
          {/* More... */}
        </ul>
      </SectionCard>

      {/* ⚠️ Overdue Returns */}
      <SectionCard title="Overdue Books">
        <ul className="text-sm space-y-2 text-red-600">
          <li><strong>DBMS Concepts</strong> - overdue by <em>Shuvo</em> (5 days)</li>
          <li><strong>Discrete Math</strong> - overdue by <em>Sadia</em> (2 days)</li>
        </ul>
      </SectionCard>

      {/* 📊 Daily Issued/Return Chart - Placeholder */}
      <SectionCard title="Daily Activity Chart (Issued vs Returned)">
        <div className="w-full h-52 bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-600">[ Chart Coming Soon... ]</p>
        </div>
      </SectionCard>
    </div>
  );
};

const StatCard = ({ icon, label, value, bg }) => (
  <div className={`rounded-xl p-5 shadow-md flex items-center gap-4 ${bg}`}>
    <div className="text-gray-800">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
  </div>
);

const SummaryCard = ({ label, value, percent, icon, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-500';
  return (
    <div className="p-5 bg-white rounded-xl shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-gray-700">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
      <span className={`text-sm font-semibold ${trendColor}`}>{percent}</span>
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default HomeAdmin;
