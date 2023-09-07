import {
  Container,
  Grid,
  InputBase,
  Stack,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { style } from "./customStyles";
import { useState } from "react";
import rain from '../images/rain.png'
import  snow from '../images/snow.png'
import mist from '../images/mist.png'
import drizzle from '../images/drizzle.png'
import clouds from '../images/clouds.png'
import clear from '../images/clear.png'
import '../style.css';


function Main() {
  const [temp, setTemp] = useState("--");
  const [cityName, setCityName] = useState("--");
  const [city, setCity] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [windSpeed, setWindSpeed] = useState("--");
  const [image, setImage] = useState(clear);
  const [error, setError] = useState("");

  const apiKey = "1bfba5fbff1c5ca73775bb4fe26c100d";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      let data = await response.json();
      setTemp(Math.round(data.main.temp));
      setCity(data.name);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      if (data.weather[0].main === "Clouds") {
        setImage(clouds);
      } else if (data.weather[0].main === "Clear") {
        setImage(clear);
      } else if (data.weather[0].main === "Drizzle") {
        setImage(drizzle);
      } else if (data.weather[0].main === "Mist") {
        setImage(mist);
      } else if (data.weather[0].main === "Rain") {
        setImage(rain);
      } else if (data.weather[0].main === "Snow") {
        setImage(snow);
      }
      console.log(data);
    } catch {
      setError("City not found. Please enter a valid city name.");
    }
  }

  return (
    <>
      <Container maxWidth="100%" sx={{ backgroundColor: "primary.main" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 500,
              background: 'linear-gradient(135deg, green, blue)',
              borderRadius: "15px",
              padding: "16px",
            }}
          >
            <Grid container justifyContent="center">
              <Grid item marginTop="30px">
                <Stack spacing={2} direction="row">
                  <InputBase
                    sx={style.fields}
                    placeholder="Search City"
                    onChange={(e) => {
                      setCityName(e.target.value);
                    }}
                  >
                    <input type="text" />
                  </InputBase>

                  <IconButton
                    arial-label="search"
                    size="medium"
                    sx={{
                      backgroundColor: "white",
                    }}
                    onClick={() => {
                      checkWeather(cityName);
                    }}
                  >
                    <SearchIcon sx={{ fontSize: "35px" }} />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} justifyContent="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <img src={image} alt="icon" className="main-image" />
                  <Typography variant="h1" color='white'>{temp}°c</Typography>
                  <Typography variant="h3" color='white' sx={{ textAlign: "center" }}>
                    {city}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} justifyContent="center">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                  >
                    <Stack direction="row">
                      <img src="" alt="humidity" />
                      <Box>
                        <Typography variant="h5" color='white'>{humidity}%</Typography>
                        <Typography variant="h6" color='white'>Humidity</Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                  >
                    <Stack direction="row">
                      <img src="" alt="wind" />
                      <Box>
                        <Typography variant="h5" color='white'>{windSpeed} km/h</Typography>
                        <Typography variant="h6" color='white'>Wind Speed</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              {error && (
                <Grid item xs={12} justifyContent="center">
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

export default Main;
