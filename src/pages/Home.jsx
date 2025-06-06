import React from "react";
import { Link } from "react-router-dom";
import campus from "../assets//images/spi-5.jpg";
import campus1 from "../assets/images/spi-3.jpg";
import campus2 from "../assets/images/spi-6.jpg";
import campus3 from "../assets/images/spi-1.jpg";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* <h2 className="text-blue-800 font-bold mb-2">What's On</h2> */}

            <img
              src={campus}
              alt="New Centennial Exhibition"
              className="w-full h-96 object-cover rounded shadow pt-2"
            />
            <h3 className="text-2xl font-semibold mt-4">
              New Centennial Exhibition! 100: A Century of Collections,
              Community, and Creativity
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {" "}
              OPEN NOW. THROUGH JUNE 30, 2026{" "}
            </p>
            <p className="text-sm text-gray-800">
              {" "}
              Schomburg Center for Research in Black Culture{" "}
            </p>
            <button className="mt-6 border border-blue-800 text-gray-800 px-6 py-2 rounded-full hover:bg-amber-100 transition">
              SEE MORE . . .{" "}
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 space-y-6">
            {/* Tab Menu */}
            <div className="grid grid-cols-3 justify-between border-b border-red-500 pb-2 text-sm font-semibold uppercase">
              <span className="hover:text-red-600 cursor-pointer">
                {" "}
                Author Talks & Conversations{" "}
              </span>
              <span className="text-red-600 border-b-2 border-red-600">
                {" "}
                Exhibitions{" "}
              </span>
              <span className="hover:text-red-600 cursor-pointer">
                {" "}
                Kids & Teens{" "}
              </span>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={campus1}
                  alt="A Century"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base">
                    {" "}
                    A Century of The New Yorker{" "}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {" "}
                    OPEN NOW. THROUGH FEBRUARY 21, 2026{" "}
                  </p>
                  <p className="text-sm">Stephen A. Schwarzman Building</p>
                </div>
              </div>

              <div className="flex gap-4">
                <img
                  src={campus2}
                  alt="Jazz"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base">
                    Rhythm Is My Business: Women Who Shaped Jazz
                  </h4>

                  <p className="text-sm text-gray-600">
                    OPEN NOW. THROUGH JUNE 13, 2025
                  </p>

                  <p className="text-sm">Library for the Performing Arts</p>
                </div>
              </div>

              <div className="flex gap-4">
                <img
                  src={campus}
                  alt="Motherwell"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base">
                    Robert Motherwell: At Home and in the Studio
                  </h4>
                  <p className="text-sm text-gray-600">
                    OPEN NOW. THROUGH AUGUST 2, 2025
                  </p>
                  <p className="text-sm">Stephen A. Schwarzman Building</p>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  src={campus3}
                  alt="Motherwell"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base">
                    Robert Motherwell: At Home and in the Studio
                  </h4>
                  <p className="text-sm text-gray-600">
                    OPEN NOW. THROUGH AUGUST 2, 2025
                  </p>
                  <p className="text-sm">Stephen A. Schwarzman Building</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      {/* Hero Section */}
      <section className="bg-gray-100 text-gray-800 py-12 px-4 md:px-16">
        {/* Top Bar */}

        {/* Search Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-lg md:text-xl font-medium max-w-xl">
                Internet Archive is a non-profit library of millions of free
                texts, movies, software, music, websites, and more.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <input
                type="text"
                placeholder="Enter URL or keywords"
                className="px-4 py-2 border border-gray-300 rounded-l-md w-64 md:w-80"
              />
              <button className="px-4 py-2 bg-black text-white rounded-r-md">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-10 grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded shadow">
            🔍
            <br />
            How to search the archive
          </div>
          <div className="bg-white p-4 rounded shadow">
            ⬇️
            <br />
            How to download files
          </div>
          <div className="bg-white p-4 rounded shadow">
            🎵
            <br />
            Listening to music
          </div>
          <div className="bg-white p-4 rounded shadow">
            🕰️
            <br />
            Find old web pages
          </div>
        </div>
      </section>
       
      

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Library",
                description:
                  "Access eBooks, audiobooks, and more from anywhere.",
                link: "/digital-library",
              },
              {
                title: "Meeting Rooms",
                description: "Reserve spaces for your meetings and events.",
                link: "/meeting-rooms",
              },
              {
                title: "Research Resources",
                description:
                  "Explore databases and research tools for all ages.",
                link: "/research",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-green-700 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Digital Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Digital Resources
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Freegal", link: "/freegal" },
              { name: "Kanopy", link: "/kanopy" },
              { name: "Universal Class", link: "/universal-class" },
              { name: "Goodreads Reviews", link: "/goodreads" },
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded text-center hover:bg-gray-200 transition"
              >
                <h3 className="text-lg font-medium mb-2">{resource.name}</h3>
                <Link
                  to={resource.link}
                  className="text-green-700 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Library Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Library Locations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Civic Center Library",
                address: "3839 N. Drinkwater Blvd, Scottsdale, AZ 85251",
                hours: "Mon-Thu: 10am–7pm, Fri-Sat: 10am–5pm, Sun: 1pm–5pm",
              },
              {
                name: "Mustang Library",
                address: "10101 N. 90th St, Scottsdale, AZ 85258",
                hours: "Mon-Thu: 10am–7pm, Fri-Sat: 10am–5pm, Sun: 1pm–5pm",
              },
            ].map((location, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                <p className="mb-1">{location.address}</p>
                <p className="text-sm text-gray-600">{location.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      </div>
      
  );
}
