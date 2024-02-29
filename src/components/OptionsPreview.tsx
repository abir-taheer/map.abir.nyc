import { Typography } from "@mui/joy";
import { OptionsStore } from "../stores/options.ts";

export const OptionsPreview = () => {
  const startYear = OptionsStore((s) => s.startYear);
  const endYear = OptionsStore((s) => s.endYear);
  const saved = OptionsStore((s) => s.saved);

  if (!saved) {
    return <Typography>Save options to start plotting</Typography>;
  }

  return (
    <Typography>
      Showing buildings from {startYear} to {endYear}
    </Typography>
  );
};
