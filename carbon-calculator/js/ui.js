/**
 * UI - Global object for user interface helper and rendering functions.
 *
 * All methods are attached to the global UI object so the app can call
 * UI.formatNumber, UI.renderResults, UI.showLoading, etc.
 */
var UI = {
    /**
     * Format a number with decimal places and thousand separators (pt-BR style).
     * @param {number|string} number
     * @param {number} decimal
     * @returns {string}
     */
    formatNumber: function(number, decimal) {
        var n = Number(number);
        if (isNaN(n)) {
            return "0";
        }
        var fixed = n.toFixed(decimal);
        // toLocaleString with pt-BR adds '.' thousands and ',' decimal
        return Number(fixed).toLocaleString('pt-BR', {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        });
    },

    /**
     * Format currency in Brazilian real using pt-BR locale.
     * @param {number|string} value
     * @returns {string}
     */
    formatCurrency: function(value) {
        var n = Number(value);
        if (isNaN(n)) {
            n = 0;
        }
        return n.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show an element by removing the 'hidden' CSS class.
     * @param {string} elementId
     */
    showELement: function(elementId) {
        var el = document.getElementById(elementId);
        if (!el) return;
        el.classList.remove('hidden');
    },

    /**
     * Hide an element by adding the 'hidden' CSS class.
     * @param {string} elementId
     */
    hideELement: function(elementId) {
        var el = document.getElementById(elementId);
        if (!el) return;
        el.classList.add('hidden');
    },

    /**
     * Scroll smoothly to an element by ID.
     * @param {string} elementId
     */
    scrollToElement: function(elementId) {
        var el = document.getElementById(elementId);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    /**
     * Render the result cards for a route with emission and travel data.
     * @param {Object} data
     * @returns {string}
     */
    renderResults: function(data) {
        var origin = data.origin || '--';
        var destination = data.destination || '--';
        var distance = data.distance || 0;
        var emission = data.emission || 0;
        var mode = data.mode || 'car';
        var savings = data.savings || null;

        var modeMeta = (CONFIG && CONFIG.TRANSPORT_MODES && CONFIG.TRANSPORT_MODES[mode])
            ? CONFIG.TRANSPORT_MODES[mode]
            : { label: mode, icon: '🚘', color: '#38bdf8' };

        // Cards for the main results area
        var resultCards = '';

        // Route card
        resultCards += '<div class="results__card results__card--route">';
        resultCards += '  <div class="results__card-title">Rota</div>';
        resultCards += '  <div class="results__card-value">' + origin + ' → ' + destination + '</div>';
        resultCards += '</div>';

        // Distance card
        resultCards += '<div class="results__card results__card--distance">';
        resultCards += '  <div class="results__card-title">Distância</div>';
        resultCards += '  <div class="results__card-value">' + this.formatNumber(distance, 2) + ' km</div>';
        resultCards += '</div>';

        // Emission card
        resultCards += '<div class="results__card results__card--emission">';
        resultCards += '  <div class="results__card-title">Emissão de CO₂</div>';
        resultCards += '  <div class="results__card-value">' + this.formatNumber(emission, 2) + ' kg <span class="results__leaf">🍃</span></div>';
        resultCards += '</div>';

        // Transport mode card
        resultCards += '<div class="results__card results__card--transport" style="border-color: ' + modeMeta.color + ';">';
        resultCards += '  <div class="results__card-title">Modo de Transporte</div>';
        resultCards += '  <div class="results__card-value">' + modeMeta.icon + ' ' + modeMeta.label + '</div>';
        resultCards += '</div>';

        // Savings card (only if mode is not car and savings exists)
        if (mode !== 'car' && savings && !isNaN(savings.savedKg) && !isNaN(savings.percentage)) {
            resultCards += '<div class="results__card results__card--savings">';
            resultCards += '  <div class="results__card-title">Economia vs Carro</div>';
            resultCards += '  <div class="results__card-value">-' + this.formatNumber(savings.savedKg, 2) + ' kg (' + this.formatNumber(savings.percentage, 2) + '%)</div>';
            resultCards += '</div>';
        }

        return '<div class="results__cards">' + resultCards + '</div>';
    },

    /**
     * Render the comparison block for all modes and highlight selected.
     * @param {Array} modesArray
     * @param {string} selectedMode
     * @returns {string}
     */
    rederComparison: function(modesArray, selectedMode) {
        if (!Array.isArray(modesArray)) {
            return '<div class="comparison__empty">Nenhum modo disponível para comparação.</div>';
        }

        var maxEmission = 0;
        modesArray.forEach(function(item) {
            if (item && typeof item.emission === 'number') {
                maxEmission = Math.max(maxEmission, item.emission);
            }
        });
        if (maxEmission <= 0) {
            maxEmission = 1;
        }

        var html = '<div class="comparison__list">';

        modesArray.forEach(function(item) {
            var modeMeta = (CONFIG && CONFIG.TRANSPORT_MODES && CONFIG.TRANSPORT_MODES[item.mode])
                ? CONFIG.TRANSPORT_MODES[item.mode]
                : { label: item.mode, icon: '🚘', color: '#94a3b8' };

            var isSelected = item.mode === selectedMode;
            var badge = isSelected ? '<span class="comparison__badge">Selecionado</span>' : '';

            var percentage = item.percentageVsCar || 0;
            var width = Math.min(100, (item.emission / maxEmission) * 100);

            var colorClass = 'red';
            if (width <= 25) {
                colorClass = 'green';
            } else if (width <= 75) {
                colorClass = 'yellow';
            } else if (width <= 100) {
                colorClass = 'orange';
            }

            html += '<div class="comparison__item">';
            html += '  <div class="comparison__headline">';
            html += '    <span class="comparison__icon">' + modeMeta.icon + '</span>';
            html += '    <span class="comparison__label">' + modeMeta.label + '</span>';
            html += badge;
            html += '  </div>';
            html += '  <div class="comparison__stats">';
            html += '    <span>Emissão: ' + UI.formatNumber(item.emission, 2) + ' kg</span>';
            html += '    <span>Vs carro: ' + UI.formatNumber(percentage, 2) + '%</span>';
            html += '  </div>';
            html += '  <div class="comparison__progress">';
            html += '    <div class="comparison__bar comparison__bar--' + colorClass + '" style="width:' + width + '%"></div>';
            html += '  </div>';
            html += '</div>';
        });

        html += '</div>';
        html += '<div class="comparison__top-box">Comparação gerada em relação ao carro. Opte por modos mais limpos para reduzir emissões.</div>';
        return html;
    },

    /**
     * Render carbon credits info cards.
     * @param {Object} credsData
     * @returns {string}
     */
    renderCarbonCredts: function(credsData) {
        if (!credsData || typeof credsData.credits !== 'number' || !credsData.price) {
            return '<div class="carbon-credits__empty">Dados de créditos indisponíveis.</div>';
        }

        var credits = credsData.credits;
        var price = credsData.price;
        var min = Number(price.min || 0);
        var max = Number(price.max || 0);
        var average = Number(price.average || 0);

        var html = '<div class="carbon-credits__grid">';
        html += '  <div class="carbon-credits__card">';
        html += '    <div class="carbon-credits__title">Créditos necessários</div>';
        html += '    <div class="carbon-credits__value">' + this.formatNumber(credits, 2) + '</div>';
        html += '    <div class="carbon-credits__helper">1 crédito = 1000 kg CO₂</div>';
        html += '  </div>';

        html += '  <div class="carbon-credits__card">';
        html += '    <div class="carbon-credits__title">Preço estimado</div>';
        html += '    <div class="carbon-credits__value">' + this.formatCurrency(average) + '</div>';
        html += '    <div class="carbon-credits__helper">Faixa: ' + this.formatCurrency(min) + ' - ' + this.formatCurrency(max) + '</div>';
        html += '  </div>';
        html += '</div>';

        html += '<div class="carbon-credits__info">Créditos de carbono ajudam a compensar emissões através de projetos ambientais certificados.</div>';
        html += '<button class="carbon-credits__button" type="button">Compensar Emissões</button>';

        return html;
    },

    /**
     * Set loading state on a button.
     * @param {HTMLElement} buttonElement
     */
    showLoading: function(buttonElement) {
        if (!buttonElement) return;
        if (!buttonElement.dataset.originalText) {
            buttonElement.dataset.originalText = buttonElement.innerHTML;
        }
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Restore button text after loading.
     * @param {HTMLElement} buttonElement
     */
    hideLoading: function(buttonElement) {
        if (!buttonElement) return;
        buttonElement.disabled = false;
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};
