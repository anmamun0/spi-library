import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  StarOff,
  Mail,
  BookOpen,
  GraduationCap,
  CalendarClock,
  LoaderCircle,
} from "lucide-react";

const BookViewers = ({ viewers_profile=[] }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const uniqueProfileIds = [...new Set(viewers_profile)];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "https://spi-library.onrender.com/user/profile"
        );
        const filtered = response.data.filter((profile) =>
          uniqueProfileIds.includes(profile.id)
        );
        setProfiles(filtered);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueProfileIds.length > 0) {
      fetchProfiles();
    }
  }, [viewers_profile]);

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex gap-1">
        {Array.from({ length: totalStars }, (_, i) =>
          i < rating ? (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ) : (
            <StarOff key={i} className="w-4 h-4 text-gray-300" />
          )
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
        <LoaderCircle className="w-8 h-8 animate-spin" />
        <span>Loading viewer profiles...</span>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {profiles.length === 0 ? (
        <p className="text-gray-500 text-sm">No viewer profiles found.</p>
      ) : (
        <div className="grid gap-4">
          {profiles.map((viewer) => (
            <div
              key={viewer.id}
              className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              {/* Left: Viewer Info */}
              <div className="space-y-2 text-gray-800">
                <p className="text-lg font-medium">{viewer.full_name}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{viewer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    {viewer.department} {viewer.session}{" "}
                  </span>
                </div>
              </div>

              {/* Right: Rating and Books Read */}
              <div className="flex flex-col items-end gap-2">
                {renderStars(viewer.rating || 0)}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <BookOpen className="w-4 h-4" />
                  <span>{viewer.total_book_read || 0} books read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookViewers;
