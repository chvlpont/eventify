"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [seatsLeft, setSeatsLeft] = useState(0);

  // Fetch detailed information about a clicked event
  const fetchEventDetails = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/event/${id}`);
      const data = await response.json();
      setEventDetails(data);
      if (user && user.id) {
        setIsBooked(data.bookedUsers.includes(user.id));
        console.log(user.id);
      }
    } catch (error) {
      console.log("Error fetching event details data:", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id, isLoaded]);

  useEffect(() => {
    if (eventDetails) {
      const numberOfBookedUsers = eventDetails.bookedUsers.length;
      const numberOfSeats = eventDetails.numberOfSeats;
      setSeatsLeft(numberOfSeats - numberOfBookedUsers);
    }
  }, [eventDetails]);

  // Signs up on a event
  const handleSignUpEventButton = async () => {
    try {
      const token = await getToken();
      // console.log(token);
      const response = await fetch("http://localhost:8080/api/event/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await response.json();
      console.log("Event booked successfully:", data);
      setIsBooked(true);
      setSeatsLeft((prevSeatsLeft) => prevSeatsLeft - 1);
      toast.success("Event booked!");
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  // Cancel event booking
  const handleCancelEventButton = async () => {
    try {
      const token = await getToken();
      // console.log(token);
      const response = await fetch(
        "http://localhost:8080/api/event/removeBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId: id }),
        }
      );
      const data = await response.json();
      console.log("Event cancelled successfully:", data);
      setIsBooked(false);
      setSeatsLeft((prevSeatsLeft) => prevSeatsLeft + 1);
      toast.success("Event cancelled!");
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {eventDetails ? (
          <div className="nunito px-72 my-28">
            <div className="font-bold text-6xl mt-28">{eventDetails.title}</div>
            <div className="flex gap-10 my-10 text-lg">
              <div>{eventDetails.category}</div>
              <div>{eventDetails.location}</div>
              <div>{new Date(eventDetails.date).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-10 mt-20">
              <img
                className="object-cover w-1/2"
                src={eventDetails.imageUrl}
                alt={eventDetails.title}
              />
              <div className="flex flex-col justify-between w-1/2">
                <div className="mb-10 text-base">
                  {eventDetails.description}
                </div>
                <div className="mt-auto">
                  <div className="text-lg mb-6">
                    {seatsLeft === 1
                      ? "1 seat left"
                      : `${seatsLeft} seats left`}
                  </div>
                  {isBooked ? (
                    <button
                      className="font-bold border-2 p-2 hover:bg-white hover:text-black"
                      onClick={handleCancelEventButton}
                    >
                      REMOVE FROM EVENT
                    </button>
                  ) : seatsLeft <= 0 ? (
                    <button
                      className="font-bold border-2 border-rose-500 p-2 bg-black text-rose-500 cursor-not-allowed"
                      disabled
                    >
                      FULLY BOOKED
                    </button>
                  ) : (
                    <button
                      className="font-bold border-2 p-2 hover:bg-white hover:text-black"
                      onClick={handleSignUpEventButton}
                    >
                      SIGN UP ON EVENT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
