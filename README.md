# WeatherMapApi
<p style = "font-family: Arial, sans-serif;">This project is a Web API that provides city locations and real-time weather data. It serves as the backend for an interactive map that displays cities and their weather conditions.</p>
<h2 style = "font-family: Arial, sans-serif;">Features</h2>
City Listings: Fetches a list of cities from an SQLite database (cities.db).
Weather Data: Retrieves real-time weather information using the OpenWeather API.
Interactive Map: Displays cities on a map with clustering and weather popups.
Search & Navigation: Allows searching for cities and centering the map on selected locations.
<h2 style = "font-family: Arial, sans-serif;">API Endpoints</h2>
<ul>
  <li>GET /cities – Returns a list of cities with their names, latitudes, and longitudes.</li>
  <li>GET /weather/<lat>/<lon> – Fetches weather data (temperature, humidity, condition) for a given latitude and longitude.</li>
</ul>
<h2>Technologies Used</h2>
<ul>
  <li>Backend: FastAPI (or Flask, depending on deployment)</li>
  <li>Database: SQLite (cities.db)</li>
  <li>Frontend: JavaScript, MapLibre</li>
  <li>External API: OpenWeather API</li>
</ul>
<h2>Setup & Installation</h2>   
Clone the repository:
git clone https://github.com/yourusername/your-repo.git
cd your-repo
<h3>Install dependencies and run the api server:</h3>
<ol>
  <li>pip install -r requirements.txt</li>
  <li>uvicorn main:app --reload</li>
</ol>
<h2>Open the frontend:</h2>
http://localhost:8000/static/index.html
<h2>Future Improvements that could be done</h2>
<ol>
  <li>Enhance UI/UX based on Figma design</li>
  <li>Optimize city clustering for better performance</li>
  <li>Deploy API for public use</li>
</ol>



