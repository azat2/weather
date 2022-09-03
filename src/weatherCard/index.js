import { useSelector } from "react-redux";
import { Button, Card } from "@mui/material";

import { weatherData } from "../store/selectors";
import { buttonName, countryList } from "../constants";

const WeatherCard = ({ getData }) => {
  const {
    name,
    sys: { country } = {},
    main: { temp },
  } = useSelector(weatherData);

  const handleRegionChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value, "value");
    getData(value);
  };

  return (
    <>
      <Button
        text="yerevan"
        value={buttonName[country]}
        variant="contained"
        onClick={handleRegionChange}
      >
        {buttonName[country]}
      </Button>

      <Card variant="outlined">
        <div>
          <p>We are currently in</p>
          <h1>
            {name}, {countryList[country]}
          </h1>
        </div>
        <p1>{temp} F</p1>
      </Card>
    </>
  );
};

export default WeatherCard;
