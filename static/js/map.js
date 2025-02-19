let map; // Declare map globally

// Fetch the cities from your API 
async function fetchCities() {
    const response = await fetch('/cities');
    const cities = await response.json();
    return cities;
}

// Fetch weather data from the weather endpoint
async function fetchWeather(lat, lon) {
    const response = await fetch(`/weather/${lat}/${lon}`);
    const weatherData = await response.json();
    return weatherData;
}

// Function to move the map to a city's location and update city info
async function flyToCity(lat, lon, cityName) {
    if (!map) return; // Ensure the map is initialized

    map.flyTo({
        center: [lon, lat],
        zoom: 10,
        essential: true
    });

    // Show city info box
    document.getElementById('city-info').style.display = 'block';
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('city-coordinates').textContent = `Lat: ${lat}, Lng: ${lon}`;

    // Fetch and display weather data
    try {
        const weatherData = await fetchWeather(lat, lon);
        if (!weatherData.error) {
            document.getElementById('weather-info').innerHTML = `
                <p>Temperature: ${weatherData.temperature}°C</p>
                <p>Humidity: ${weatherData.humidity}%</p>
                <p>Condition: ${weatherData.weather}</p>
            `;
        } else {
            document.getElementById('weather-info').textContent = "Weather data unavailable";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weather-info').textContent = "Error fetching weather data";
    }

    // Make the close button visible
    document.getElementById('close-info').style.display = 'block';
}

(async () => {
    const cities = await fetchCities();

    // Sort cities alphabetically
    const sortedCities = cities.sort((a, b) => a.city.localeCompare(b.city));

    // Filter valid cities
    const validCities = sortedCities.filter(city => 
        city.latitude >= -90 && city.latitude <= 90 && 
        city.longitude >= -180 && city.longitude <= 180
    );

    // Create GeoJSON for clustering
    const citiesGeoJSON = {
        type: 'FeatureCollection',
        features: validCities.map(city => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [city.longitude, city.latitude]
            },
            properties: {
                city: city.city,
                latitude: city.latitude,
                longitude: city.longitude
            }
        }))
    };

    // Initialize MapLibre map
    map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR API KEY',
        center: [0, 0], // Default center
        zoom: 2 // Default zoom
    });

    map.on('load', () => {
        // Add a GeoJSON source
        map.addSource('cities', {
            type: 'geojson',
            data: citiesGeoJSON
        });

        // Add a layer for individual markers
        map.addLayer({
            id: 'cities-markers',
            type: 'circle',
            source: 'cities',
            paint: {
                'circle-color': '#ff5733',
                'circle-radius': 5
            }
        });

        // Add zoom control
        map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        // Populate the city list dynamically
        const cityListContainer = document.getElementById('city-list');

        validCities.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.textContent = city.city;
            cityItem.setAttribute('data-lat', city.latitude);
            cityItem.setAttribute('data-lon', city.longitude);

            // Add click event to move the map and show info
            cityItem.addEventListener('click', () => {
                flyToCity(city.latitude, city.longitude, city.city);
            });

            cityListContainer.appendChild(cityItem);
        });

        // Search functionality
        const searchInput = document.getElementById('city-search');
        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            const cityItems = document.querySelectorAll('.city-item');
            cityItems.forEach(item => {
                const cityName = item.textContent.toLowerCase();
                if (cityName.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Initially hide the close button
        const closeButton = document.getElementById('close-info');
        closeButton.style.display = 'none';

        // Close button functionality
        closeButton.addEventListener('click', () => {
            document.getElementById('city-info').style.display = 'none';
            closeButton.style.display = 'none'; // Hide button after closing the info box
        });

        // Click event to update city info
        map.on('click', 'cities-markers', async (e) => {
            const city = e.features[0].properties;

            // Open the city info box
            document.getElementById('city-info').style.display = 'block';
            document.getElementById('city-name').textContent = city.city;
            document.getElementById('city-coordinates').textContent = `Lat: ${city.latitude}, Lng: ${city.longitude}`;

            // Fetch and display weather data
            try {
                const weatherData = await fetchWeather(city.latitude, city.longitude);
                if (!weatherData.error) {
                    document.getElementById('weather-info').innerHTML = `
                        <p>Temperature: ${weatherData.temperature}°C</p>
                        <p>Humidity: ${weatherData.humidity}%</p>
                        <p>Condition: ${weatherData.weather}</p>
                    `;
                } else {
                    document.getElementById('weather-info').textContent = "Weather data unavailable";
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                document.getElementById('weather-info').textContent = "Error fetching weather data";
            }

            // Make the close button visible after the first click
            closeButton.style.display = 'block';
        });

        // Change cursor on hover
        map.on('mouseenter', 'cities-markers', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'cities-markers', () => {
            map.getCanvas().style.cursor = '';
        });
    });
})();
;
