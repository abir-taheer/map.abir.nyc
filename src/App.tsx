import {
  CircularProgress,
  Container,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { Map } from "./components/Map.tsx";
import { usePrepareDataStore } from "./hooks/usePrepareDataStore.ts";
import { OptionsForm } from "./components/OptionsForm.tsx";

function App() {
  const { loading, error } = usePrepareDataStore();

  if (loading) {
    return (
      <Container maxWidth={"md"}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          padding={8}
          gap={2}
        >
          <CircularProgress />

          <Typography level={"body-sm"} component={"p"} textAlign={"center"}>
            Loading data...
          </Typography>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={"md"}>
        <Stack gap={2} padding={4}>
          <Typography level={"title-lg"} component={"h1"} textAlign={"center"}>
            Error
          </Typography>

          <Typography level={"body-sm"} component={"p"} textAlign={"center"}>
            Something went wrong while loading the data.
          </Typography>

          <Textarea
            value={error.stack}
            readOnly={true}
            sx={{ fontFamily: "monospace" }}
          />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth={"md"} sx={{ padding: 4 }}>
      <Stack gap={2}>
        <Typography level={"title-lg"} component={"h1"} textAlign={"center"}>
          NYC Building Heights Map
        </Typography>

        <OptionsForm />

        <Map />
      </Stack>
    </Container>
  );
}

export default App;
