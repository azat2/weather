export const getState = (store = {}) => store;

 export const weatherData = store => getState(store).weather;


