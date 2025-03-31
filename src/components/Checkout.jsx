import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import logoImage from "../assets/fusshn-logo.png";
import { MdArrowBackIos } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const Checkout = () => {
  const [eventData, setEventData] = useState(null); // State to store event data
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId"); // Extract eventId from query parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", eventId); // Reference to the event document
        const docSnap = await getDoc(docRef); // Fetch the document snapshot
        if (docSnap.exists()) {
          setEventData(docSnap.data()); // Set event data if document exists
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event: ", error);
      }
    };

    if (eventId) {
      fetchEvent(); // Fetch event data if eventId is present
    }
  }, [eventId]);

  if (!eventData) {
    return <div className="text-center py-10">Loading...</div>; // Show loading state if event data is not yet available
  }

  return (
    <div lang="en" className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <img src={logoImage} alt="FUSSHN Logo" className="h-10 sm:h-12" />
      </header>

      {/* Main Content */}
      <main className="p-4 lg:px-[300px] sm:px-12">
        {/* Event Details Section */}
        <div className="bg-white w-full p-4 shadow-sm relative flex flex-col items-center">
          <MdArrowBackIos
            className="absolute left-4 top-5 text-xl cursor-pointer"
            onClick={() => navigate(-1)} // Navigate back to the previous page
          />
          <IoClose
            className="w-6 h-6 ml-72 lg:ml-[700px] cursor-pointer"
            onClick={() => navigate(-1)} // Close the checkout page
          />
          <h2 className="text-lg font-semibold">{eventData.name}</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {eventData.venue}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            {eventData.date} |{" "}
            {new Date(eventData.startTime).toLocaleTimeString()}
          </p>
        </div>

        {/* Ticket Selection Section */}
        <section className="mt-6 mb-20">
          <h3 className="text-lg font-semibold">Select Tickets</h3>
          <p className="text-gray-500 text-sm">
            You can select up to 10 tickets
          </p>
          <div className="mt-4 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">Student Pass</h4>
                  <p className="text-black font-semibold text-sm sm:text-base">
                    ₹3,999 |
                    <span
                      className={
                        index === 1 ? "text-orange-500" : "text-green-500"
                      }
                    >
                      {index === 1 ? "Selling Out fast" : "Available"}
                    </span>
                  </p>
                  <ul className="text-gray-500 list-disc list-inside text-sm sm:text-base">
                    <li>You can select up to 10 tickets</li>
                    <li>Grants entry to the VIP Access area of the concert</li>
                  </ul>
                  <button className="text-black font-semibold mt-2 flex items-center text-sm sm:text-base">
                    Show more <IoIosArrowDown size={16} className="ml-1" />
                  </button>
                </div>
                <button className="bg-green-500 hover:text-black cursor-pointer text-white text-sm px-4 py-2 rounded mt-4 sm:mt-0">
                  Add +
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center sm:justify-center sm:space-x-24">
        <div>
          <p className="text-lg font-semibold">{eventData.price}</p>
          <p className="text-sm">1 Ticket</p>
        </div>
        <button className="bg-green-500 cursor-pointer hover:text-black text-white w-full sm:w-[191px] h-[45px] rounded px-4 py-2 text-sm">
          Checkout
        </button>
      </footer>
    </div>
  );
};

export default Checkout;
