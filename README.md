# WeatherMapApi
<p style = "font-family: Arial, sans-serif;">This project is a Web API that provides city locations and real-time weather data. It serves as the backend for an interactive map that displays cities and their weather conditions.</p>
Features
City Listings: Fetches a list of cities from an SQLite database (cities.db).
Weather Data: Retrieves real-time weather information using the OpenWeather API.
Interactive Map: Displays cities on a map with clustering and weather popups.
Search & Navigation: Allows searching for cities and centering the map on selected locations.
API Endpoints
GET /cities – Returns a list of cities with their names, latitudes, and longitudes.
GET /weather/<lat>/<lon> – Fetches weather data (temperature, humidity, condition) for a given latitude and longitude.
Technologies Used
Backend: FastAPI (or Flask, depending on deployment)
Database: SQLite (cities.db)
Frontend: JavaScript, MapLibre
External API: OpenWeather API
Setup & Installation
Clone the repository:
sh
Copy
Edit
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install dependencies:
sh
Copy
Edit
pip install -r requirements.txt
Run the API server:
sh
Copy
Edit
uvicorn main:app --reload  # If using FastAPI  
python app.py  # If using Flask  
Open the frontend:
bash
Copy
Edit
http://localhost:8000/static/index.html
Future Improvements
Enhance UI/UX based on Figma design
Optimize city clustering for better performance
Deploy API for public use
