const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CurrencyList = function(){
  this.currencies = [];
}

CurrencyList.prototype.currencyIncludes = function(currencyName, currenciesList) {
  for (var i = 0; i< currenciesList.length; i++ ) {
    if(currenciesList[i].name == currencyName) {
      return true
    };
  }
  return false;
}

CurrencyList.prototype.bindEvents = function(){
  PubSub.subscribe("SelectView:currency_name-selected", (event) => {
    var currency_name = event.detail;
    var selected_country = [];
    this.countries.forEach((country) => {

      if(this.currencyIncludes(currency_name, country.currencies)) {
        selected_country.push(country);
      }
    });
    // console.log(selected_country)
    PubSub.publish("CurrencyList:country-ready", selected_country)
  })
}



CurrencyList.prototype.getCurrencies = function(){
  const request = new Request("https://restcountries.eu/rest/v2/all");
  request.get((data) => {
  this.countries = data;
  var names = this.countries.map((country) => {
    return country.currencies.map((currency) => {
      return currency.name;
    });
  });
  var uniq_names =[];
  names.forEach((name) => {
    uniq_names.push(...name)
  });
  uniq_names = new Set(uniq_names.sort())
  PubSub.publish("CurrencyList:names-ready", uniq_names);
  });
};

module.exports = CurrencyList;
