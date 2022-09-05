import { memo } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { weatherData } from "../../store/selectors";
import { buttonName, countryList, setBackgroundColor } from "../../constants";

const WeatherCard = ({ setBackground, isLoading, getData }) => {
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
    setBackground(setBackgroundColor[country]);
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
            <Typography
              sx={{ marginBottom: "20px" }}
              variant="h5"
              component="div"
            >
              {name}, {countryList[country]}
            </Typography>
            <Typography
              sx={{
                mb: 1.5,
                borderRadius: " 3px",
                border: "solid rgb(171, 215, 228)",
                margin: "auto",
                width: " 70%",
              }}
              color="text.secondary"
            >
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
        sx={{ marginTop: "40px", marginLeft: "40px" }}
      >
        {buttonName[country]}
      </Button>

      <Card
        sx={{
          width: "500px",
          margin: "auto",
          marginBottom: "3em",
          borderRadius: "7px",
          textAlign: "center",
        }}
        variant="outlined"
      >
        {card}
      </Card>
    </>
  );
};

export default memo(WeatherCard);
