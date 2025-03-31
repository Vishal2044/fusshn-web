import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore instance
import { Helmet } from "react-helmet";
import eventImg from "../assets/evnt-img.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import time from "../assets/time.png";
import user from "../assets/user.png";
import arijit from "../assets/arijit.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import mapImage from "../assets/map.png";
import poster from "../assets/event-post.png";
import { IoIosArrowDown } from "react-icons/io";
import { Header, Footer } from "./HeaderFooter";

const ViewEvent = () => {
  const { eventId } = useParams(); // Extract event ID from route parameters
  const [eventData, setEventData] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", eventId); // Reference to the event document
        const docSnap = await getDoc(docRef); // Fetch the document
        if (docSnap.exists()) {
          setEventData(docSnap.data()); // Set event data if document exists
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event: ", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div lang="en" className="bg-black text-white">
      <Header city="All" setCity={() => {}} />
      <main className="p-4 sm:p-20">
        <div className="p-4 rounded-lg flex flex-col sm:flex-row">
          <img
            src={eventData.posterUrl}
            alt="Event Image"
            className="w-full sm:w-[730px] h-[200px] sm:h-[342px] rounded-lg object-cover"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-[442px] h-auto sm:h-[342px] rounded-lg bg-gray-900 p-6">
            <h1 className="text-lg sm:text-2xl font-bold">{eventData.name}</h1>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <img src={user} alt="User Icon" className="w-5 h-5 mr-2" />
                <span className="font-bold w-16 sm:w-24">Date</span> :
                <span className="ml-4 font-semibold text-gray-400">
                  {eventData.date}
                </span>
              </li>
              <li className="flex items-center">
                <img src={time} alt="Time Icon" className="w-5 h-5 mr-2" />
                <span className="font-bold w-16 sm:w-24">Start Time</span> :
                <span className="ml-4 font-semibold text-gray-400">
                  {new Date(eventData.startTime).toLocaleTimeString()}
                </span>
              </li>
              <li className="flex items-center">
                <HiOutlineLocationMarker className="w-5 h-5 mr-2" />
                <span className="font-bold w-16 sm:w-24">Venue</span> :
                <span className="ml-4 font-semibold text-gray-400">
                  {eventData.venue}
                </span>
              </li>
            </ul>
            <div className="p-2 rounded-lg flex flex-col sm:flex-row justify-between items-center mt-4">
              <p className="text-lg sm:text-[20px] font-bold">
                {eventData.price}
              </p>
              <button
                className="bg-green-500 hover:text-black cursor-pointer text-white w-full sm:w-[191px] h-[45px] gap-[4px] rounded-[8px] px-[16px] py-[10px] bg-opacity-70 shadow-[4px_4px_2px_0px_rgba(0,0,0,0.25)] mt-2 sm:mt-0"
                onClick={() =>
                  (window.location.href = `/checkout?eventId=${eventId}`)
                }
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          {/* About Event Section */}
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold">About Event</h2>
            <p className="mt-2 text-gray-400 text-sm sm:text-base">
              {eventData.description}
            </p>
          </section>
          {/* More Information Section */}
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold">More Information</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Language Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Language</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.language.join(", ")}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Age Limit Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Age Limit</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.ageLimit}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Age Limit Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Duration</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.duration}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Seating Arrangement Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Seating Arrangement</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.seatingArrangement}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Layout Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Layout</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.layout}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg flex items-center">
                <img
                  src={user}
                  alt="Parking Icon"
                  className="w-12 bg-gray-900 p-4 h-12 rounded-lg mr-4"
                />
                <div>
                  <p className="mt-2 text-sm sm:text-base">Parking</p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {eventData.parking}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Artist Section */}
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold">Artist</h2>
            <div className="mt-4 flex flex-col sm:flex-row items-center">
              <img
                src={eventData.artist.image}
                alt="Artist Image"
                className="h-24 w-24 rounded-lg"
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h3 className="text-lg font-bold">{eventData.artist.name}</h3>
                <a href="#" className="text-gray-500 flex items-center justify-center sm:justify-start">
                  {eventData.artist.aboutLink}
                  <MdKeyboardArrowRight size={25} className="text-white" />
                </a>
              </div>
            </div>
          </section>
          {/* Venue Section */}
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold">Venue</h2>
            <div className="mt-4 bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm sm:text-base">
                  {eventData.venueDetails.description}
                </p>
                <button
                  className="w-full sm:w-[179px] h-[45px] font-semibold text-white cursor-pointer hover:bg-green-500 border border-[rgba(120,248,148,0.7)] px-4 py-[10px] rounded-lg mt-4"
                  onClick={() => window.open(eventData.locationUrl, "_blank")}
                >
                  Get Direction
                </button>
              </div>
              <img
                src={mapImage}
                alt="Map Image"
                className="w-full sm:w-[352px] h-[164px] rounded-lg mt-4 sm:mt-0"
              />
            </div>
          </section>
          {/* Terms & Conditions Section */}
          <section className="mt-8">
            <div
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => setShowTerms(!showTerms)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Terms & Conditions</h2>
                <button className="text-gray-400">
                  <IoIosArrowDown
                    size={22}
                    className={`text-white font-bold transform ${
                      showTerms ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {showTerms && (
                <ul className="mt-4 text-gray-400 space-y-2 text-sm sm:text-base">
                  {eventData.termsAndConditions.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          {/* FAQ Section */}
          <section className="mt-8">
            <div
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => setShowFAQ(!showFAQ)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Frequently Asked Questions</h2>
                <button className="text-gray-400">
                  <IoIosArrowDown
                    size={22}
                    className={`text-white font-bold transform ${
                      showFAQ ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {showFAQ && (
                <ul className="mt-4 text-gray-400 space-y-2 text-sm sm:text-base">
                  {eventData.frequentlyAskedQuestions.map((faq, index) => (
                    <li key={index}>
                      <strong>{faq.question}</strong>
                      <p>{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          {/* Recommended Events Section */}
          <section className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold">You may Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {eventData.recommendedEvents.map((event, index) => (
                <div
                  key={index}
                  className="relative group p-4 rounded overflow-hidden cursor-pointer"
                  onClick={() => (window.location.href = `/home`)} // Navigate to event
                >
                  <img
                    src={event.poster} // Use event poster
                    alt={event.name}
                    className="w-full h-[200px] sm:h-[300px] object-cover rounded transition-all duration-300 group-hover:scale-105 group-hover:blur-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="text-black cursor-pointer font-extrabold px-4 py-2 rounded border-1 border-white"
                    >
                      View
                    </button>
                  </div>
                  <h3 className="mt-2 text-sm sm:text-lg font-bold">{event.name}</h3>
                  <p className="text-xs sm:text-sm">{event.date}</p>
                  <p className="text-xs sm:text-sm">{event.venue}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewEvent;
