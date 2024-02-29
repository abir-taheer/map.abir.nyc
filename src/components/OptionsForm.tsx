import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@mui/joy";
import { useCallback, useState } from "react";
import { OptionsStore } from "../stores/options.ts";

const rgbToHex = (rgb: [number, number, number]) =>
  "#" + rgb.map((c) => c.toString(16)).join("");

const hexToRgb = (hex: string): [number, number, number] => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{1,2}/g)!
    .map((c) => parseInt(c, 16));

  return [r, g, b];
};

export const OptionsForm = () => {
  const options = OptionsStore((s) => s);
  const [startYear, setStartYear] = useState(options.startYear);
  const [endYear, setEndYear] = useState(options.endYear);

  const [startColor, setStartColor] = useState(rgbToHex(options.startColor));
  const [endColor, setEndColor] = useState(rgbToHex(options.endColor));

  const [startHeight, setStartHeight] = useState(0);
  const [endHeight, setEndHeight] = useState(200);

  const handleSave = useCallback(() => {
    OptionsStore.setState({
      startYear,
      endYear,
      startColor: hexToRgb(startColor),
      endColor: hexToRgb(endColor),
      startHeight,
      endHeight,
      saved: true,
    });
  }, [endColor, endHeight, endYear, startColor, startHeight, startYear]);

  return (
    <Card>
      <AccordionGroup variant="plain" transition="0.2s">
        <Accordion defaultExpanded>
          <AccordionSummary>Options</AccordionSummary>
          <AccordionDetails>
            <Stack gap={2} paddingTop={2}>
              <Stack direction={"row"} gap={2}>
                <FormControl>
                  <FormLabel>Start Year</FormLabel>
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

              <Stack direction={"row"} gap={2}>
                <Stack gap={2}>
                  <FormControl>
                    <FormLabel>Start Height</FormLabel>
                    <Input
                      value={startHeight}
                      onChange={(ev) =>
                        !Number.isNaN(Number(ev.target.value)) &&
                        setStartHeight(Number(ev.target.value))
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Height Color</FormLabel>
                    <input
                      style={{ border: 0, padding: 2, borderRadius: 4 }}
                      type={"color"}
                      value={startColor}
                      onChange={(ev) => setStartColor(ev.target.value)}
                    />
                    <FormHelperText>
                      Buildings approaching the start height will approach this
                      color
                    </FormHelperText>
                  </FormControl>
                </Stack>

                <Stack gap={2}>
                  <FormControl>
                    <FormLabel>End Height</FormLabel>
                    <Input
                      value={endHeight}
                      onChange={(ev) =>
                        !Number.isNaN(Number(ev.target.value)) &&
                        setEndHeight(Number(ev.target.value))
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Height Color</FormLabel>
                    <input
                      style={{ border: 0, padding: 2, borderRadius: 4 }}
                      type={"color"}
                      value={endColor}
                      onChange={(ev) => setEndColor(ev.target.value)}
                    />
                    <FormHelperText>
                      Buildings approaching the end height will approach to this
                      color
                    </FormHelperText>
                  </FormControl>
                </Stack>
              </Stack>

              <Divider />

              <Button variant={"soft"} onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Card>
  );
};
