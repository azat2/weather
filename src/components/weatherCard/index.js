import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { weatherData } from "../../store/selectors";
import { buttonName, countryList } from "../../constants";

const WeatherCard = ({ isLoading, getData }) => {
  const {
    name,
    main: { temp } = {},
    sys: { country } = {},
  } = useSelector(weatherData);

  const handleRegionChange = (e) => {
    const {
      target: { value },
    } = e;

    getData(value);
  };

  const card = (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          We are currently in
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5" component="div">
              {name}, {countryList[country]}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {temp} F
            </Typography>
          </>
        )}
      </CardContent>
    </>
  );

  return (
    <>
      <Button
        text="yerevan"
        variant="contained"
        value={buttonName[country]}
        onClick={handleRegionChange}
      >
        {buttonName[country]}
      </Button>

      <Card variant="outlined">{card}</Card>
    </>
  );
};

export default WeatherCard;
