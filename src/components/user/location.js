

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


export async function getCoordsFromAddress(address) {

    const nativeAddress = `${address.address_line1 || ""}, ${address.address_line2 || ""}`.trim();
    const cityAddress = `${address.city}, ${address.state}, ${address.country}`.trim();

    return getCoordsFromAddressHelper(cityAddress, nativeAddress);
}


export async function getCoordsFromAddressHelper(cityAddress, nativeAddress = "") {
    // First try: full address
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${nativeAddress}, ${cityAddress}`)}`;

    let response = await fetch(url, {
        headers: { "User-Agent": "YourAppName/1.0 (your@email.com)" },
    });

    let data = await response.json();

    // If no results, retry with only city-level address
    if (data.length === 0) {
        console.warn("No coordinates found for detailed address, retrying with city...");
        url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityAddress)}`;
        response = await fetch(url, {
            headers: { "User-Agent": "YourAppName/1.0 (your@email.com)" },
        });
        data = await response.json();
    }

    if (data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lon), parseFloat(lat)]; // GeoJSON [lon, lat]
    } else {
        console.warn("No coordinates found for:", address);
        return null;
    }
}

export async function getAddressFromCoords(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    const response = await fetch(url, {
        headers: { "User-Agent": "YourAppName/1.0 (your@email.com)" }
    });
    const data = await response.json();

    if (data && data.address) {
        const a = data.address;
        return {
            address_line1: a.road || "",
            city: a.city || a.town || a.village || "",
            state: a.state || "",
            postal_code: a.postcode || "",
            country: a.country || "",
            formatted_address: data.display_name,
        };
    } else {
        console.warn("No address found for:", lat, lon);
        return null;
    }
}
