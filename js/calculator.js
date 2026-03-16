/**
 * Calculator - Global object for carbon emission calculations
 *
 * Provides methods to calculate emissions, compare transport modes,
 * compute savings, and estimate carbon credit values.
 */
var Calculator = {
    /**
     * Calculates the carbon emission for a given distance and transport mode.
     *
     * @param {number} distanceKm - The distance in kilometers.
     * @param {string} transportMode - The transport mode (e.g., 'car', 'bus').
     * @returns {number} The emission in kg CO2, rounded to 2 decimal places.
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Get emission factor from CONFIG.EMISSION_FACTORS using transportMode as key
        var factor = CONFIG.EMISSION_FACTORS[transportMode];
        if (factor === undefined) {
            throw new Error("Invalid transport mode: " + transportMode);
        }
        // Calculate: distance * factor
        var emission = distanceKm * factor;
        // Return result rounded to 2 decimal places
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculates emissions for all transport modes and compares them to the car baseline.
     *
     * @param {number} distanceKm - The distance in kilometers.
     * @returns {Array} Array of objects sorted by emission (lowest first), each with mode, emission, and percentageVsCar.
     */
    calculateAllModes: function(distanceKm) {
        // Create array to store results
        var results = [];
        // Calculate car emission as baseline
        var carEmission = this.calculateEmission(distanceKm, 'car');
        // For each transport mode in CONFIG.EMISSION_FACTORS
        for (var mode in CONFIG.EMISSION_FACTORS) {
            // Calculate emission for that mode
            var emission = this.calculateEmission(distanceKm, mode);
            // Calculate percentage vs car: (emission / carEmission) * 100
            var percentageVsCar = carEmission === 0 ? 0 : Math.round((emission / carEmission) * 100 * 100) / 100;
            // Push object to array
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }
        // Sort array by emission (lowest first)
        results.sort(function(a, b) {
            return a.emission - b.emission;
        });
        // Return array
        return results;
    },

    /**
     * Calculates the savings in emissions compared to a baseline.
     *
     * @param {number} emission - The emission for the alternative mode.
     * @param {number} baseLineEmission - The baseline emission (e.g., car).
     * @returns {Object} Object with savedKg and percentage, rounded to 2 decimals.
     */
    calculateSavings: function(emission, baseLineEmission) {
        // Calculate saved kg: baseline - emission
        var savedKg = baseLineEmission - emission;
        // Calculate percentage: (saved / baseline) * 100
        var percentage = baseLineEmission === 0 ? 0 : (savedKg / baseLineEmission) * 100;
        // Return object with rounded numbers to 2 decimals
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Calculates the number of carbon credits equivalent to the emission.
     *
     * @param {number} emissionKg - The emission in kg CO2.
     * @returns {number} The number of credits, rounded to 4 decimal places.
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emission by CONFIG.CARBON_CREDIT.KG_PER_CREDIT
        var credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        // Return rounded to 4 decimal places
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimates the price range for a given number of carbon credits.
     *
     * @param {number} credits - The number of credits.
     * @returns {Object} Object with min, max, and average prices in BRL, rounded to 2 decimals.
     */
    estimateCreditPrice: function(credits) {
        // Calculate min: credits * PRICE_MIN_BRL
        var min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        // Calculate max: credits * PRICE_MAX_BRL
        var max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        // Calculate average: (min + max) / 2
        var average = (min + max) / 2;
        // Return object with rounded numbers to 2 decimals
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            average: Math.round(average * 100) / 100
        };
    }
};