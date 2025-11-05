

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

