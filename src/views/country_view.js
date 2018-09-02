const PubSub = require('../helpers/pub_sub');


const CountryView = function(container){
  this.container = container;
}

CountryView.prototype.bindEvents = function(){
  PubSub.subscribe("CurrencyList:country-ready", (event) => {
    const countries = event.detail;
    // console.log(event.detail);
    this.container.innerHTML = "";
    countries.forEach((country) => {
      this.render(country);
    });
  });
};

CountryView.prototype.render = function(country){
  // console.log(country);
  const header = this.createHeader(country);
  this.container.appendChild(header);

  const details = this.createDetails(country);
  this.container.appendChild(details);

}

CountryView.prototype.createHeader = function(country){
  const header = document.createElement('header');
  const h1 = document.createElement('h3');
  h1.textContent = country.name;
  h1.classList.add("header");
  header.appendChild(h1);
  return header;
};

CountryView.prototype.createDetails = function(country){
  const detailDiv = document.createElement('section');
  const region = document.createElement('li');
  region.textContent = "Region: " + country.region;
  detailDiv.appendChild(region);

  const capital = document.createElement('li');
  capital.textContent = "Capital: " + country.capital;
  detailDiv.appendChild(capital);

  const currencies = country.currencies.map((currency) => {
    return currency.name;
  });
  currencyText = "Currency: " + currencies.join(', ');
  const currency = document.createElement('li');
  currency.textContent = currencyText;
  detailDiv.appendChild(currency);
  return detailDiv;
}


module.exports = CountryView;
