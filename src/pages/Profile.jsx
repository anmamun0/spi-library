import React from "react";

const Profile = ( ) => {
    const student = {};
    const borrowedBooks = [];
    const transactions = [] 

  const {
    username,
    full_name,
    email,
    phone,
    roll,
    registration,
    session,
    department,
    address,
    blood,
    nationality_type,
    nationality_number,
    role,
    image_url,
  } = student;

  // Calculate some summary stats
  const totalBooks = borrowedBooks.length;
  const overdueBooks = borrowedBooks.filter(book => {
    if (!book.dueDate) return false;
    return new Date(book.dueDate) < new Date() && book.status !== "Returned";
  }).length;
  const totalFines = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6">
      <div className="max-w-6xl w-full backdrop-blur-md bg-white/60 border border-blue-800/30 rounded-3xl shadow-lg p-8 text-slate-800">

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 tracking-wide drop-shadow-sm">
          Library Student Dashboard
        </h1>

        {/* Top Summary Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <SummaryCard label="Total Books Borrowed" value={totalBooks} color="blue" />
          <SummaryCard label="Overdue Books" value={overdueBooks} color="yellow" />
          <SummaryCard label="Total Fines (BDT)" value={totalFines.toFixed(2)} color="slate" />
        </div>

        <div className="flex flex-col md:flex-row gap-12">

          {/* Left: Profile Info */}
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-md mx-auto md:mx-0 mb-6">
              <img
                src={image_url || "https://via.placeholder.com/176?text=No+Image"}
                alt={`${full_name}'s profile`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <ProfileRow label="Full Name" value={full_name} />
              <ProfileRow label="Username" value={username} />
              <ProfileRow label="Email" value={email} />
              <ProfileRow label="Phone" value={phone} />
              <ProfileRow label="Roll" value={roll} />
              <ProfileRow label="Registration No." value={registration} />
              <ProfileRow label="Session" value={session} />
              <ProfileRow label="Department" value={department} />
              <ProfileRow label="Address" value={address} />
              <ProfileRow label="Blood Group" value={blood} />
              <ProfileRow label="Nationality Type" value={nationality_type} />
              <ProfileRow label="Nationality Number" value={nationality_number} />
              <ProfileRow label="Role" value={role} />
            </div>
          </div>

          {/* Right: Borrowed Books + Transactions */}
          <div className="flex-grow space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b border-blue-800/40 pb-2">
                Borrowed Books
              </h2>
              {borrowedBooks.length === 0 ? (
                <p className="text-slate-600 italic">No borrowed books found.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-blue-800/30 shadow-sm">
                  <table className="w-full text-left text-slate-800">
                    <thead className="bg-blue-800/10">
                      <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Borrow Date</th>
                        <th className="px-4 py-3">Due Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowedBooks.map(({ id, title, borrowDate, dueDate, status }) => (
                        <tr
                          key={id}
                          className={`border-t border-blue-800/20 ${
                            status === "Overdue" || (new Date(dueDate) < new Date() && status !== "Returned")
                              ? "bg-yellow-100"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium">{title}</td>
                          <td className="px-4 py-3">{new Date(borrowDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">{dueDate ? new Date(dueDate).toLocaleDateString() : "-"}</td>
                          <td className="px-4 py-3 capitalize">{status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b border-blue-800/40 pb-2">
                Transaction History
              </h2>
              {transactions.length === 0 ? (
                <p className="text-slate-600 italic">No transactions found.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-blue-800/30 shadow-sm">
                  <table className="w-full text-left text-slate-800">
                    <thead className="bg-blue-800/10">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Amount (BDT)</th>
                        <th className="px-4 py-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(({ id, date, type, amount, notes }) => (
                        <tr key={id} className="border-t border-blue-800/20">
                          <td className="px-4 py-3">{new Date(date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 capitalize">{type}</td>
                          <td className="px-4 py-3">{amount.toFixed(2)}</td>
                          <td className="px-4 py-3">{notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div>
    <span className="text-sm font-semibold text-blue-800/80">{label}</span>
    <p className="text-lg font-medium">{value || "N/A"}</p>
  </div>
);

const SummaryCard = ({ label, value, color }) => {
  const bgColors = {
    blue: "bg-blue-800/20 text-blue-800",
    yellow: "bg-yellow-400/30 text-yellow-700",
    slate: "bg-slate-800/20 text-slate-800",
  };
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl p-6 shadow-md min-w-[160px] ${bgColors[color]}`}
    >
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-sm mt-1 font-medium">{label}</p>
    </div>
  );
};

export default Profile;
