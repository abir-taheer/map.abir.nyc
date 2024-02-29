import { Link, Stack, Typography } from "@mui/joy";

export const Source = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={1}
      justifyContent={"center"}
    >
      <Typography level={"body-md"} textAlign={"center"} marginY={4}>
        View source on{" "}
      </Typography>
      <Link href={"https://github.com/abir-taheer/map.abir.nyc"}>
        <Stack direction={"row"} gap={0.5} alignItems={"center"}>
          {" "}
          <img src={"/github-mark.png"} height={16} width={16} />
          GitHub
        </Stack>
      </Link>
    </Stack>
  );
};
