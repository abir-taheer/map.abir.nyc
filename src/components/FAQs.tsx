import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Card,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

export const FAQs = () => {
  return (
    <Card>
      <Typography level={"title-lg"} textAlign={"center"}>
        FAQs
      </Typography>

      <AccordionGroup>
        <Accordion>
          <AccordionSummary>Where is the data coming from?</AccordionSummary>
          <AccordionDetails>
            <Typography level={"body-sm"} paddingY={2}>
              This data is from the{" "}
              <Link
                href={
                  "https://data.cityofnewyork.us/Housing-Development/Building-Footprints/nqwf-w8eh"
                }
                target={"_blank"}
              >
                NYC OpenData Building Footprints
              </Link>{" "}
              data set. The raw dataset is nearly half a gigabyte and contains
              over a million rows of data which would not be feasible to load in
              a browser. The data was processed with extraneous information
              removed in order to create a much smaller file (~70MB) that can be
              loaded in a reasonable amount of time.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Why are the plots rectangles?</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} paddingY={2}>
              <Typography level={"body-sm"}>
                The data set was processed to make it smaller but every single
                building was kept in order to ensure the integrity of any
                analysis when modifying the options.
              </Typography>

              <Typography level={"body-sm"}>
                However, this poses an issue where it's possible to ask the
                browser to try and plot nearly a million points on the map which
                most computers would struggle to do. To solve this issue nearby
                buildings are grouped together using a technique called{" "}
                <Link
                  href={"https://en.wikipedia.org/wiki/Geohash"}
                  target={"_blank"}
                >
                  geohashing (Wikipedia)
                </Link>
              </Typography>

              <Typography level={"body-sm"}>
                The rectangles that are plotted on the map are the bounds of
                each of the geohash groups. The{" "}
                <Link
                  href={"https://www.npmjs.com/package/ngeohash"}
                  target={"_blank"}
                >
                  Node-GeoHash library
                </Link>
                , alongside a precision value of 7, was used to calculate the
                hashes for the coordinates of each of the buildings
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>Any disclaimers?</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} paddingY={2}>
              <Typography level={"body-sm"}>
                As a matter of fact, yes! Due to the geohashing technique as
                well as the dense urban landscape of New York, when many
                different years are plotted all together there is a bias towards
                lower heights reflected on the map.
              </Typography>

              <Typography level={"body-sm"}>
                This is because many of the rectangle groups can contain up to
                tens of buildings sometimes depending on the nature of the
                block. This means that the average height is brought down by the
                many other smaller buildings on the same block. This is less of
                an issue when plotting a smaller number of years.
              </Typography>

              <Typography level={"body-sm"}>
                A possible solution might be to use the square footage of each
                of the buildings as a multiplier when calculating the average
                height but that is not currently available with this dataset.
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Card>
  );
};
