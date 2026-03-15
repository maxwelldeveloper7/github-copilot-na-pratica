document.addEventListener('DOMContentLoaded', function () {
    CONFIG.populateDatalist();
    CONFIG.setupDistanceAutofill();

    var form = document.getElementById('calculator-form');
    var resultsSection = document.getElementById('results');
    var resultsContent = document.getElementById('results-content');
    var comparisonSection = document.getElementById('comparison');
    var comparisonContent = document.getElementById('comparison-content');
    var creditsSection = document.getElementById('carbon-credits');
    var creditsContent = document.getElementById('carbon-credits-content');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var button = form.querySelector('button[type="submit"]');
        UI.showLoading(button);

        setTimeout(function () {
            var origin = document.getElementById('origin').value.trim();
            var destination = document.getElementById('destination').value.trim();
            var distance = Number(document.getElementById('distance').value);
            var selectedMode = form.querySelector('input[name="transport"]:checked').value;

            if (!origin || !destination || isNaN(distance) || distance <= 0) {
                alert('Por favor, informe origem, destino e distância válida.');
                UI.hideLoading(button);
                return;
            }

            var emission = Calculator.calculateEmission(distance, selectedMode);
            var allModes = Calculator.calculateAllModes(distance);
            var carEmission = Calculator.calculateEmission(distance, 'car');
            var savingsData = null;
            if (selectedMode !== 'car') {
                savingsData = Calculator.calculateSavings(emission, carEmission);
            }

            var credits = Calculator.calculateCarbonCredits(emission);
            var price = Calculator.estimateCreditPrice(credits);

            resultsContent.innerHTML = UI.renderResults({
                origin: origin,
                destination: destination,
                distance: distance,
                emission: emission,
                mode: selectedMode,
                savings: savingsData
            });

            comparisonContent.innerHTML = UI.rederComparison(allModes, selectedMode);
            creditsContent.innerHTML = UI.renderCarbonCredts({
                credits: credits,
                price: price
            });

            UI.showELement('results');
            UI.showELement('comparison');
            UI.showELement('carbon-credits');
            UI.scrollToElement('results');

            UI.hideLoading(button);
        }, 300);
    });
});