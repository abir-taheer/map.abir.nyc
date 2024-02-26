import { useEffect, useId, useLayoutEffect } from "react";
import { useTheme } from "@mui/joy";
import { MapStore } from "../stores/map.ts";
import { DataStore } from "../stores/data.ts";
import geohash from "ngeohash";
import { OptionsStore } from "../stores/options.ts";
import { useShallow } from "zustand/react/shallow";

export const Map = () => {
  const id = useId();
  const theme = useTheme();
  const map = MapStore((s) => s.map);
  const buildings = DataStore((s) => s.buildings);
  const getOverlay = MapStore((s) => s.getOverlay);
  const [
    startColor,
    endColor,
    startHeight,
    endHeight,
    endYear,
    startYear,
    saved,
    precision,
  ] = OptionsStore(
    useShallow((s) => [
      s.startColor,
      s.endColor,
      s.startHeight,
      s.endHeight,
      s.endYear,
      s.startYear,
      s.saved,
      s.precision,
    ]),
  );

  useLayoutEffect(() => {
    const state = MapStore.getState();

    const current = new google.maps.Map(document.getElementById(id)!, {
      zoom: state.zoom,
      center: state.center,
      mapTypeId: "terrain",
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      keyboardShortcuts: false,
      isFractionalZoomEnabled: false,
    });

    const onMapChange = () => {
      MapStore.setState({
        center: {
          lat: current!.getCenter()!.lat(),
          lng: current!.getCenter()!.lng(),
        },
        zoom: current.getZoom(),
      });
    };

    const listeners = [
      current.addListener("center_changed", onMapChange),
      current.addListener("zoom_changed", onMapChange),
    ];

    MapStore.setState({ map: current });

    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, [id]);

  useEffect(() => {
    if (!buildings.length || !map || !saved) {
      return;
    }

    const accountedFor = new Set<string>();
    const heightsByHash: Record<string, number[]> = {};

    buildings
      .filter(
        (building) => building.year >= startYear && building.year <= endYear,
      )
      .forEach((building) => {
        const hash = geohash.encode(building.lat, building.lng, precision);

        if (!heightsByHash[hash]) {
          heightsByHash[hash] = [];
        }

        heightsByHash[hash].push(building.height);

        if (accountedFor.has(hash)) {
          return null;
        }

        accountedFor.add(hash);
      });

    const overlays = Object.entries(heightsByHash)
      .map(([hash, heights]) => {
        const total = heights.reduce((a, b) => a + b);
        const average = total / heights.length;

        const percentage = Math.max(
          0,
          Math.min(1, (average - startHeight) / (endHeight - startHeight)),
        );

        const color = [
          Math.round(
            startColor[0] + percentage * (endColor[0] - startColor[0]),
          ),
          Math.round(
            startColor[1] + percentage * (endColor[1] - startColor[1]),
          ),
          Math.round(
            startColor[2] + percentage * (endColor[2] - startColor[2]),
          ),
        ];

        const hex = `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
        const overlay = getOverlay(hash);

        overlay.set("fillColor", hex);
        overlay.setVisible(true);

        return overlay;
      })
      .filter(Boolean);

    return () => {
      overlays.forEach((overlay) => overlay.setVisible(false));
    };
  }, [
    buildings,
    endColor,
    endHeight,
    endYear,
    getOverlay,
    map,
    precision,
    saved,
    startColor,
    startHeight,
    startYear,
  ]);

  return (
    <div
      id={id}
      style={{ width: "100%", height: 600, borderRadius: theme.radius.md }}
    />
  );
};
