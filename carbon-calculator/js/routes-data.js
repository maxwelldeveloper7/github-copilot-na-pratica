/**
 * RoutesDB - Global object containing Brazilian route data and utility methods
 * 
 * Structure:
 * - routes: Array of route objects, each with:
 *   - origin: string (city name with state, e.g., "São Paulo, SP")
 *   - destination: string (city name with state)
 *   - distanceKm: number (distance in kilometers)
 * 
 * Methods:
 * - getAllCities(): Returns a sorted array of unique city names from all routes
 * - findDistance(origin, destination): Finds the distance between two cities, searching both directions
 */

// Global RoutesDB object
var RoutesDB = {
    // Array of Brazilian routes with distances
    routes: [
        // Southeast Region - Capital connections
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Belo Horizonte, MG", destination: "Brasília, DF", distanceKm: 716 },
        
        // Southeast Region - Regional routes
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 156 },
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 260 },
        
        // South Region
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1108 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Porto Alegre, RS", destination: "Florianópolis, SC", distanceKm: 476 },
        
        // Northeast Region
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1649 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Salvador, BA", destination: "Fortaleza, CE", distanceKm: 1028 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Recife, PE", destination: "João Pessoa, PB", distanceKm: 120 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        
        // North Region
        { origin: "Brasília, DF", destination: "Belém, PA", distanceKm: 2126 },
        { origin: "Brasília, DF", destination: "Manaus, AM", distanceKm: 3493 },
        { origin: "Belém, PA", destination: "Manaus, AM", distanceKm: 5293 },
        { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 },
        
        // Center-West Region
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Brasília, DF", destination: "Cuiabá, MT", distanceKm: 1133 },
        { origin: "Goiânia, GO", destination: "Cuiabá, MT", distanceKm: 934 },
        { origin: "Cuiabá, MT", destination: "Campo Grande, MS", distanceKm: 694 },
        
        // Additional regional routes
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 524 },
        { origin: "Belo Horizonte, MG", destination: "Vitória, ES", distanceKm: 524 },
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },
        { origin: "Recife, PE", destination: "Maceió, AL", distanceKm: 285 },
        { origin: "Fortaleza, CE", destination: "Teresina, PI", distanceKm: 634 },
        { origin: "Belém, PA", destination: "Palmas, TO", distanceKm: 1024 },
        { origin: "Manaus, AM", destination: "Boa Vista, RR", distanceKm: 785 },
        { origin: "Cuiabá, MT", destination: "Porto Velho, RO", distanceKm: 1456 }
    ],

    /**
     * Returns a sorted array of unique city names from all routes
     * @returns {string[]} Array of unique city names, sorted alphabetically
     */
    getAllCities: function() {
        var cities = [];
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if (cities.indexOf(route.origin) === -1) {
                cities.push(route.origin);
            }
            if (cities.indexOf(route.destination) === -1) {
                cities.push(route.destination);
            }
        }
        cities.sort();
        return cities;
    },

    /**
     * Finds the distance between two cities, searching both directions
     * @param {string} origin - Origin city name
     * @param {string} destination - Destination city name
     * @returns {number|null} Distance in km if found, null otherwise
     */
    findDistance: function(origin, destination) {
        // Normalize input: trim whitespace and convert to lowercase
        var normalizedOrigin = origin.trim().toLowerCase();
        var normalizedDestination = destination.trim().toLowerCase();
        
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            var routeOrigin = route.origin.toLowerCase();
            var routeDestination = route.destination.toLowerCase();
            
            // Check both directions
            if ((normalizedOrigin === routeOrigin && normalizedDestination === routeDestination) ||
                (normalizedOrigin === routeDestination && normalizedDestination === routeOrigin)) {
                return route.distanceKm;
            }
        }
        return null;
    }
};