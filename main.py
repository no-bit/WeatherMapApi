import requests
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import sqlite3
from pydantic import BaseModel

app = FastAPI()

# Serve static files (e.g., CSS, JS, images)
app.mount("/static", StaticFiles(directory="static"), name="static")

# OpenWeather API Key (Replace with your actual key)
OPENWEATHER_API_KEY = "YOUR API KEY"

# Define the City model
class City(BaseModel):
    id: int
    city: str
    latitude: float
    longitude: float

# Function to fetch city data from the database
def get_cities_from_db():
    conn = sqlite3.connect('cities.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cities')
    cities = cursor.fetchall()
    conn.close()
    return [City(id=row[0], city=row[1], latitude=row[2], longitude=row[3]) for row in cities if row[1] and row[2] and row[3]]

# API endpoint to return city data
@app.get("/cities", response_model=list[City])
def get_cities():
    return get_cities_from_db()

# API endpoint to fetch weather data
@app.get("/weather/{lat}/{lon}")
def get_weather(lat: float, lon: float):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        weather_info = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "weather": data["weather"][0]["description"]
        }
        return weather_info
    else:
        return {"error": "Failed to fetch weather data"}

# Serve the HTML file when visiting the root URL
@app.get("/")
async def serve_html():
    return FileResponse("static/index.html")













































































