

export async function getAccuratePosition({ timeout = 10000, samples = 5, maxAcceptableAccuracy = 30 } = {}) {
    if (!navigator.geolocation) throw new Error("Geolocation not supported");

    function getOne() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout,
                maximumAge: 0
            });
        });
    }

    const positions = [];
    const start = Date.now();
    while (positions.length < samples && (Date.now() - start) < timeout * samples) {
        try {
            const pos = await getOne();
            positions.push({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                accuracy: pos.coords.accuracy, // meters
                timestamp: pos.timestamp
            });
            // stop early if we already have a very accurate reading
            if (pos.coords.accuracy <= maxAcceptableAccuracy) break;
        } catch (err) {
            // handle permission/timeout errors as needed
            break;
        }
    }

    if (!positions.length) throw new Error("Could not obtain position");

    // choose the sample with smallest accuracy, or compute weighted avg
    positions.sort((a, b) => a.accuracy - b.accuracy);
    const best = positions[0];
    return { lat: best.lat, lon: best.lon, accuracy: best.accuracy, samples };
}

export async function updateLocation(address) {
    const { address_line1, address_line2, city, state, postal_code, country } = address;

    // Construct full address
    const fullAddress = `${address_line1}, ${address_line2 || ''}, ${city}, ${state}, ${postal_code}, ${country}`;

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=YOUR_API_KEY`);
        const data = await response.json();

        if (data.status === "OK") {
            const location = data.results[0].geometry.location; // { lat: ..., lng: ... }
            return [location.lng, location.lat]; // GeoJSON coordinates format: [lng, lat]
        } else {
            console.error("Geocoding error:", data.status);
            return null;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}


export async function getAddressFromCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=YOUR_API_KEY`
        );
        const data = await response.json();

        if (data.status === "OK") {
            // The formatted address
            const formattedAddress = data.results[0].formatted_address;

            // Optional: You can also extract individual fields like city, state, postal code
            const components = data.results[0].address_components;
            const address = {
                address_line1: components[0]?.long_name || "",
                city: components.find(c => c.types.includes("locality"))?.long_name || "",
                state: components.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "",
                postal_code: components.find(c => c.types.includes("postal_code"))?.long_name || "",
                country: components.find(c => c.types.includes("country"))?.long_name || "",
            };

            return { formattedAddress, ...address };
        } else {
            console.error("Reverse geocoding error:", data.status);
            return null;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}
