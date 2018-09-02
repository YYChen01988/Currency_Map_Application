const CurrencyList = require('./models/currency_list.js');
const SelectView = require('./views/select_view.js');
const CountryView = require('./views/country_view.js');
const MapWrapper = require('./views/map_wrapper.js');


document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('#currencies')
  const selectView = new SelectView(select);
  selectView.bindEvents();

  const countryDetail = document.querySelector('#countries');
  const countryView = new CountryView(countryDetail);
  countryView.bindEvents();

  const mainMap = document.querySelector('#map-container');
  const mapWrapper = new MapWrapper(mainMap);
  mapWrapper.bindEvents();


  const currencyList = new CurrencyList();
  currencyList.getCurrencies();
  currencyList.bindEvents();

});
