"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("none");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Fetch events from api
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/event");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter out old events
  const currentEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );

  // Filter events by selected date range
  const filteredEvents =
    startDate && endDate
      ? currentEvents.filter(
          (event) =>
            new Date(event.date) >= startDate && new Date(event.date) <= endDate
        )
      : currentEvents;

  // Sort events based on selected criteria
  const sortedEvents =
    sortCriteria === "none"
      ? filteredEvents
      : [...filteredEvents].sort((a, b) => {
          if (sortCriteria === "date") {
            return new Date(a.date) - new Date(b.date);
          } else if (sortCriteria === "location") {
            return a.location.localeCompare(b.location);
          }
          return 0;
        });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="nunito p-28 w-10/12 mx-auto text-white">
          <div className="mb-10 text-6xl font-bold">Events</div>
          <div className="mb-8 flex items-center">
            <label className="mr-2">Sort by:</label>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="bg-gray-800 p-2 rounded mr-4"
            >
              <option value="none">No Filter</option>
              <option value="date">Date</option>
              <option value="location">Alphabetical Location</option>
            </select>
            <label className="mr-2">Filter by date range:</label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              className="bg-gray-800 p-2 rounded w-60"
              dateFormat="yyyy-MM-dd"
              placeholderText="When?"
            />
          </div>
          {sortedEvents.length === 0 ? (
            <div className="text-center text-xl mt-20">
              There are no events based on your filter.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-10">
              {sortedEvents.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <div className="w-full hover:cursor-pointer">
                    <div className="">
                      <img
                        className="h-96 w-full object-cover"
                        src={event.imageUrl}
                        alt={event.title}
                      />
                      <div className="font-semibold text-lg my-3">
                        {event.title}
                      </div>
                      <div className="">{event.location}</div>
                      <div className="">{event.category}</div>
                      <div className="flex">
                        <div className="mb-3">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="mb-12 ml-auto text-rose-500">
                          {event.bookedUsers.length >= event.numberOfSeats &&
                            "Event Full"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
