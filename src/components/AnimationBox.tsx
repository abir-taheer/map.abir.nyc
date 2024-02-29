import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { OptionsStore } from "../stores/options.ts";

export const AnimationBox = () => {
  const [animate, setAnimate] = useState(false);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(1);
  const [seconds, setSeconds] = useState(0.5);

  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        const state = OptionsStore.getState();

        const newStart = state.startYear + startYear;
        const newEnd = state.endYear + endYear;

        if (newEnd >= 2025) {
          setAnimate(false);
        }

        OptionsStore.setState({
          startYear: newStart,
          endYear: newEnd,
        });
      }, seconds * 1000);

      return () => clearInterval(interval);
    }
  }, [animate, endYear, seconds, startYear]);

  return (
    <Card>
      <AccordionGroup variant="plain" transition="0.2s">
        <Accordion>
          <AccordionSummary>Animate</AccordionSummary>
          <AccordionDetails>
            <Stack gap={2} paddingTop={2}>
              <Typography>Increment:</Typography>

              <Stack direction={"row"} gap={2}>
                <FormControl>
                  <FormLabel>Start year</FormLabel>
                  <Input
                    value={startYear}
                    onChange={(ev) =>
                      !Number.isNaN(Number(ev.target.value)) &&
                      setStartYear(Number(ev.target.value))
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>End Year</FormLabel>
                  <Input
                    value={endYear}
                    onChange={(ev) =>
                      !Number.isNaN(Number(ev.target.value)) &&
                      setEndYear(Number(ev.target.value))
                    }
                  />
                </FormControl>
              </Stack>

              <Typography>Every</Typography>
              <FormControl>
                <FormLabel>Seconds</FormLabel>
                <Input
                  style={{ width: 250 }}
                  value={seconds}
                  onChange={(ev) =>
                    !Number.isNaN(Number(ev.target.value)) &&
                    setSeconds(Number(ev.target.value))
                  }
                />
              </FormControl>

              <Button variant={"soft"} onClick={() => setAnimate(!animate)}>
                {animate ? "Stop" : "Animate"}
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Card>
  );
};
