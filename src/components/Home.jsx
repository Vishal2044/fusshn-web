import React, { useState, useEffect } from "react";
import { Header, Footer } from "./HeaderFooter";
import heroImg from "../assets/header-img.png";
import heroImg1 from "../assets/header-img1.jpg";
import heroImg2 from "../assets/header-img2.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../styles/animations.css";

const Home = () => {
  const [city, setCity] = useState("All"); // State to store selected city filter
  const [events, setEvents] = useState([]); // State to store fetched events
  const [currentHeroImg, setCurrentHeroImg] = useState(heroImg); // State for current hero image
  const [animationClass, setAnimationClass] = useState(""); // State for animation class
  const heroImages = [heroImg, heroImg1, heroImg2]; // Array of hero images
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Fetch events from Firestore and filter based on selected city
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredEvents =
          city === "All"
            ? eventsData
            : eventsData.filter((event) => event.city === city);
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, [city]);

  useEffect(() => {
    // Automatically cycle through hero images with animation
    const interval = setInterval(() => {
      setAnimationClass("slide-out-left");
      setTimeout(() => {
        setCurrentHeroImg((prevImg) => {
          const currentIndex = heroImages.indexOf(prevImg);
          const nextIndex = (currentIndex + 1) % heroImages.length;
          return heroImages[nextIndex];
        });
        setAnimationClass("slide-in-right");
      }, 500);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [heroImages]);

  // Handle card click: Navigate to event details if user is logged in, otherwise redirect to login
  const handleCardClick = (eventId) => {
    const user = auth.currentUser;
    if (user) {
      navigate(`/event/${eventId}`);
    } else {
      navigate("/login");
    }
  };

  // Handle dot click: Set the current hero image based on the clicked dot
  const handleDotClick = (index) => {
    setCurrentHeroImg(heroImages[index]);
  };

  return (
    <div className="bg-gray-900 text-white lg:w-full">
      <Header city={city} setCity={setCity} />
      <div className="flex relative mt-6 justify-center items-center px-2 sm:px-0">
        <img
          src={currentHeroImg}
          alt="Crowd at an event"
          className={`lg:w-full lg:max-w-[1200px] h-[180px] sm:h-[360px] rounded-lg object-cover transition-all duration-500 ${animationClass}`}
        />
      </div>
      <div className="flex justify-center mt-2 sm:mt-4 space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentHeroImg === heroImages[index] ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
      <section className="p-2 sm:p-20">
        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">
          Happening near me
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%] mx-auto px-10 lg:px-0">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative group p-3 sm:p-4 rounded overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(event.id)}
              >
                <img
                  src={event.singerposterUrl}
                  alt={event.name}
                  className="w-full max-w-[200px] sm:max-w-[220px] h-[180px] sm:h-[300px] object-cover rounded transition-all duration-300 group-hover:scale-105 group-hover:blur-md"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-black cursor-pointer font-extrabold px-3 py-1 sm:px-4 sm:py-2 rounded border-1 border-white">
                    View
                  </button>
                </div>
                <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-bold">
                  {event.name}
                </h3>
                <p className="text-xs sm:text-sm">
                  {new Date(event.startTime).toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm">{event.eventLocation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
