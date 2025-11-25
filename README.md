# Nasa_APOD_Explorer
NASA APOD Explorer is a full-stack web app built with React.js and Spring Boot that lets users view NASA’s daily, monthly, and yearly Astronomy Pictures of the Day, save favorites, and browse galleries with a responsive UI.

## **Project Overview**

The system works as follows:

1. Fetches NASA APOD data from the **NASA public API** using Spring Boot backend.
2. Stores or caches favorite APODs for users.
3. Provides a React.js frontend interface for:
   - Viewing today’s APOD
   - Searching APODs by date
   - Browsing monthly and yearly galleries
   - Saving and viewing favorite APODs
4. Handles API requests efficiently with caching and structured endpoints.
5. Fully deployable as a **single full-stack application** with React served from Spring Boot in production.

---

## **Features**

- View **today’s APOD**.  
- Search APOD by **specific date**.  
- Browse **monthly and yearly APOD galleries**.  
- Save **favorites** for later viewing.  
- Responsive **UI with light/dark mode** support.  
- Optimized **API calls with caching**.  
- Ready for **local development and production deployment**.

---

## **Tech Stack**

**Frontend:**  
- React.js  
- Vite  
- Axios (API calls)  
- Context API (state management)  
- CSS Modules / Custom CSS  

**Backend:**  
- Java  
- Spring Boot  
- Spring Web / REST Controllers  
- Caffeine Cache (optional caching)  
- Maven (build management)  

---
## **Configuration & Setup**

### **1. Clone the Repository**

git clone https://github.com/raygada/Nasa_APOD_Explorer.git
cd Nasa_APOD_Explorer

### **2. Backend (Spring Boot) Configuration**
Navigate to the backend folder:
cd backend
### **3. Set API keys or properties in src/main/resources/application.properties:**

# Example properties
nasa.api.key=YOUR_NASA_API_KEY
server.port=8087

# Run the backend:

mvn spring-boot:run
# Backend runs on http://localhost:8087.
# Test APIs like http://localhost:8087/api/apod/today.

### **4. Frontend (React) Configuration:**
# 1.Navigate to frontend folder:
cd frontend/nasa-apod-react
# 2.Create .env file in React root (where package.json is located):
VITE_API_BASE_URL=http://localhost:8087/api/apod
VITE_APP_NAME=NasaAPODExplorer
# 3.Install dependencies:
npm install
# 4. Start React frontend:
npm run dev
React app runs on http://localhost:5173 and communicates with backend.
### 5**Production Build**
# 1.Build React app:
npm run build
--> Generates a dist/ folder.

# 2.Copy contents of dist/ into Spring Boot static folder:
backend/src/main/resources/static/
# 3. Start Spring Boot:
mvn spring-boot:run
React app is now served via Spring Boot at http://localhost:8087/.
# 4. Update .env for Production
Create .env.production in React root:
VITE_API_BASE_URL=/api/apod
--> Ensures API calls work when frontend is served from backend.

## Screenshots

### Home Page
![Home Page](screenshots/Nasa_Apod_HomePage.png)

### APOD (By DateSelector)
![Select Date Page](screenshots/Nasa_Apod_Selecting_Date_Apod.png)

### Gallery Page
![Gallery Page](screenshots/Nasa_Apod_Gallery.png)

### Favorites Page
![Favorites Page](screenshots/Nasa_Apod_Favorite_Apod.png)

### APOD Images After Fetch Page
![Images After Fetch Page](screenshots/Nasa_Apod_Images_After_Fetch.png)
