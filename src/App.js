import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import TableCard from "./tableCard";
import WeatherCard from "./weatherCard";

import { saveWeather } from "./store/actions/weather";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const getData = async (countryName = "Los Angelos") => {
    setIsLoading(true);

    const getDataUrl = {
      Yerevan:
        "https://api.openweathermap.org/data/2.5/weather?lat=40.187212&lon=44.512598&appid=9223b3f15c4a221a5bcbfcc75306ea3c&units=imperial",
      "Los Angelos":
        "https://api.openweathermap.org/data/2.5/weather?lat=34.160122&lon=-118.237527&appid=9223b3f15c4a221a5bcbfcc75306ea3c&units=imperial",
    };

    try {
      const data = await fetch(getDataUrl[countryName]);
      const result = await data.json();

      if (result.cod === 200) {
        setIsLoading(false);
        dispatch(saveWeather(result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <WeatherCard isLoading={isLoading} getData={getData} />
      <TableCard isLoading={isLoading}/>
    </>
  );
}

export default App;
