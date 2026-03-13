/**
 * CONFIG - Global configuration object used by the app
 *
 * Contains emission factors, transport-mode metadata, carbon credit rules,
 * and helper functions to wire up UI elements.
 */
var CONFIG = {
    // Emission factors in Kg CO2 per Km
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    // Transport mode metadata for UI rendering
    TRANSPORT_MODES: {
        bicycle: { label: "Bicicleta", icon: "🚲", color: "#22c55e" },
        car: { label: "Carro", icon: "🚗", color: "#0ea5e9" },
        bus: { label: "Ônibus", icon: "🚍", color: "#f97316" },
        truck: { label: "Caminhão", icon: "🚚", color: "#a855f7" }
    },

    // Carbon credit configuration
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Populate the datalist element with all cities from RoutesDB.
     * Requires: <datalist id="cities-list"></datalist> in the DOM.
     */
    populateDatalist: function() {
        var datalist = document.getElementById("cities-list");
        if (!datalist) return;

        // Clear any existing options (idempotent)
        datalist.innerHTML = "";

        var cities = (typeof RoutesDB !== "undefined" && RoutesDB.getAllCities)
            ? RoutesDB.getAllCities()
            : [];

        cities.forEach(function(city) {
            var option = document.createElement("option");
            option.value = city;
            datalist.appendChild(option);
        });
    },

    /**
     * Wire the origin/destination inputs to auto-fill the distance when possible.
     * Requires: inputs with IDs 'origin', 'destination', 'distance' and checkbox 'manual-distance'.
     */
    setupDistanceAutofill: function() {
        var originInput = document.getElementById("origin");
        var destinationInput = document.getElementById("destination");
        var distanceInput = document.getElementById("distance");
        var manualCheckbox = document.getElementById("manual-distance");

        if (!originInput || !destinationInput || !distanceInput || !manualCheckbox) {
            return;
        }

        // Create helper text element (if not already present)
        var helperId = "distance-helper";
        var helper = document.getElementById(helperId);
        if (!helper) {
            helper = document.createElement("div");
            helper.id = helperId;
            helper.className = "helper-text";
            distanceInput.parentNode.insertBefore(helper, distanceInput.nextSibling);
        }

        var setHelper = function(message, color) {
            helper.textContent = message;
            helper.style.color = color || "";
        };

        var tryFillDistance = function() {
            var origin = originInput.value.trim();
            var destination = destinationInput.value.trim();

            if (!origin || !destination) {
                distanceInput.value = "";
                distanceInput.readOnly = true;
                setHelper("Digite origem e destino para preencher a distância automaticamente.");
                return;
            }

            if (manualCheckbox.checked) {
                distanceInput.readOnly = false;
                setHelper("Modo manual ativado. Insira a distância desejada.");
                return;
            }

            var distance = (typeof RoutesDB !== "undefined" && RoutesDB.findDistance)
                ? RoutesDB.findDistance(origin, destination)
                : null;

            if (distance !== null && !isNaN(distance)) {
                distanceInput.value = distance;
                distanceInput.readOnly = true;
                setHelper("Distância encontrada com sucesso.", "green");
            } else {
                distanceInput.value = "";
                distanceInput.readOnly = true;
                setHelper("Rota não encontrada. Marque a opção para preencher manualmente.", "#b45309");
            }
        };

        originInput.addEventListener("change", tryFillDistance);
        destinationInput.addEventListener("change", tryFillDistance);

        manualCheckbox.addEventListener("change", function() {
            if (manualCheckbox.checked) {
                distanceInput.readOnly = false;
                setHelper("Modo manual ativado. Insira a distância desejada.");
            } else {
                tryFillDistance();
            }
        });

        // Initial attempt to fill if values are already present
        tryFillDistance();
    }
};
