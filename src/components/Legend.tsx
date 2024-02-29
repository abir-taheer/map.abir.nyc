import { OptionsStore } from "../stores/options.ts";
import { Stack } from "@mui/joy";

export const Legend = () => {
  const startColor = OptionsStore((s) => s.startColor);
  const endColor = OptionsStore((s) => s.endColor);
  const startHeight = OptionsStore((s) => s.startHeight);
  const endHeight = OptionsStore((s) => s.endHeight);

  const half = Math.floor((endHeight - startHeight) / 2);

  return (
    <div>
      <div
        style={{
          height: 25,
          background: `linear-gradient(to right, rgb(${startColor.join(",")}), rgb(${endColor.join(",")}))`,
        }}
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <span>{startHeight}ft</span>
        <span>{half}ft</span>
        <span>{endHeight}ft</span>
      </Stack>
    </div>
  );
};
