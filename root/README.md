# Travel App

## 📌 Project Summary
This project is a custom-built travel application that integrates multiple APIs to provide weather forecasts and location images. Users can enter their travel destination and departure date to receive weather forecasts and relevant location images.

The project focuses on JavaScript while ensuring clean and appealing HTML/CSS. It incorporates DOM manipulation, object handling, and API integration. The application runs in a Webpack environment with an Express server and service workers.

---

## ✨ Features
- **User Input:** Enter a destination and departure date.
- **Weather Forecast:**
    - Current forecast for trips within a week.
    - Predicted forecast for future trips.
- **Location Image:** Displays an image of the destination.
- **API Integrations:**
    - [Geonames API](http://www.geonames.org/) for location coordinates.
    - [Weatherbit API](https://www.weatherbit.io/) for weather data.
    - [Pixabay API](https://pixabay.com/api/docs/) for location images.
- **Service Workers:** Caches assets for a better user experience.
- **Express Server:** Manages API requests securely.
- **Webpack Environment:** Bundles and optimizes assets.

---

## 🔧 Technologies Used
- JavaScript (ES6+)
- HTML5 & CSS3 (SCSS)
- Node.js & Express.js
- Webpack
- Service Workers
- Fetch API & Async/Await

---

## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/dana-akesh/travel-app.git
cd travel-app
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add your API keys:
```
GEONAMES_USERNAME=your_username
WEATHERBIT_API_KEY=your_api_key
PIXABAY_API_KEY=your_api_key
```

### **4️⃣ Start the Development Server**
```sh
npm run start
```

### **5️⃣ Build for Production**
```sh
npm run build
```

---

## 📌 Usage
1. Enter a destination and travel date in the input fields.
2. Click the "Search" button to fetch travel details.
3. View the weather forecast and location image.

---

## 🔍 Project Structure
```
travel-app/
│-- src/
│   │-- client/
│   │   ├── js/ (JavaScript functions)
│   │   ├── styles/ (SCSS files)
│   │   ├── views/ (HTML templates)
│   │   ├── index.js (entry point)
│   │-- server/
│   │   ├── index.js (Express server)
│   │   ├── routes.js (API handling)
│-- webpack.config.js
│-- .env (API keys)
│-- package.json
│-- README.md
```

---

## 🛠 Future Improvements
- Add user authentication.
- Implement a database for saving trips.
- Enhance UI/UX with animations and responsiveness.
- Optimize performance using lazy loading.

---

## 👩‍💻 Author
[Dana Akesh](https://github.com/dana-akesh)
