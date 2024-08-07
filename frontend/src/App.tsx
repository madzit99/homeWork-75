import { useState } from "react";
import { StateType } from "./type";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axiosApi from "./axiosApi";

const App = () => {
  const [state, setState] = useState<StateType>({
    decoded: "",
    encoded: "",
    password: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onEncode = async () => {
    const obj = {
      message: state.decoded,
      password: state.password,
    };

    const response = await axiosApi.post("encode", obj);
    const encodedText = response.data;

    setState((prev) => ({
      ...prev,
      decoded: "",
      encoded: encodedText,
    }));
  };

  const onDecode = async () => {
    const obj = {
      message: state.encoded,
      password: state.password,
    };

    const response = await axiosApi.post("decode", obj);
    const decodedText = response.data;

    setState((prev) => ({
      ...prev,
      encoded: "",
      decoded: decodedText,
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Шифр</Typography>
      </Grid>
      <Grid item width={500}>
        <TextField
          multiline
          rows={3}
          id="decoded"
          label="Расшифрованное сообщение"
          name="decoded"
          value={state.decoded}
          sx={{ width: "100%" }}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid
        item
        container
        width={500}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item flexGrow={1}>
          <Grid item xs>
            <TextField
              required
              id="password"
              label="Пароль"
              name="password"
              value={state.password}
              sx={{ width: "100%" }}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <Grid item>
          <IconButton type="submit" onClick={onDecode}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton type="submit" onClick={onEncode}>
            <ArrowDownwardIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item width={500}>
        <TextField
          multiline
          rows={3}
          id="encoded"
          label="Зашифрованное сообщение"
          name="encoded"
          value={state.encoded}
          sx={{ width: "100%" }}
          onChange={inputChangeHandler}
        />
      </Grid>
    </Grid>
  );
};

export default App;
