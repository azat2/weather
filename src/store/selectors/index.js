export const getState = (store = {}) => store;

 export const weatherData = store => getState(store).weather;
 export const weatherHistory = store => getState(store).history;
 export const weatherCountries = store => weatherHistory(store).countries;


