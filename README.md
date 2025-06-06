# **Fusshn - Event Ticketing Platform**  
### **Created by : Vishal Varotariya**  

Fusshn is a modern event ticketing platform built with **React and Firebase**, allowing users to browse, book, and manage event tickets seamlessly.  

---

## **Features**  

✅ **Authentication**: Secure login and signup with Firebase Authentication.  
✅ **Event Browsing**: Filter and view events based on location.  
✅ **Ticket Booking**: Select and book tickets with an intuitive checkout process.  
✅ **Responsive Design**: Optimized for all devices.  
✅ **Dynamic Routing**: Seamless navigation with React Router.  
✅ **Animations**: Smooth transitions and interactive elements.  

---

## **Project Structure**  
```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── helper/        # Helper functions and context
├── pages/         # Page components
├── styles/        # Global styles and animations
├── App.jsx        # Main application component
├── firebase.js    # Firebase configuration
├── main.jsx       # Entry point
```

---

## **Flows**  

### **1️⃣ Authentication**  
🔹 Users can sign up or log in securely.  
🔹 Protected routes ensure access only to authenticated users.  

### **2️⃣ Event Browsing**  
🔹 Users can filter events by city.  
🔹 Clicking an event opens detailed information and booking options.  

### **3️⃣ Ticket Booking**  
🔹 Users select the number of tickets and proceed to checkout.  
🔹 Confirmation and booking details are displayed post-checkout.  

---

## **Packages Used**  

📌 **React** - UI library  
📌 **React Router DOM** - Routing  
📌 **Firebase** - Authentication & Database  
📌 **Tailwind CSS** - Styling  
📌 **React Icons** - Scalable icons  
📌 **Vite** - Fast development build tool  

---

## **Environment Variables**  

Store sensitive Firebase credentials in a `.env` file:  

```
VITE_APP_FIREBASE_API_KEY=your_api_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_APP_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_FIREBASE_APP_ID=your_app_id
VITE_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## **How to Run the Project**  

1️⃣ **Clone the repository:**  
   ```bash
   git clone https://github.com/your-repo/fusshn.git
   cd fusshn
   ```  
2️⃣ **Install dependencies:**  
   ```bash
   npm install
   ```  
3️⃣ **Add a `.env` file** with your Firebase configuration.  
4️⃣ **Start the development server:**  
   ```bash
   npm run dev
   ```  

---
