import { create } from "zustand";
import geohash from "ngeohash";

type MapStoreValue = {
  map: google.maps.Map | null;
  center: { lat: number; lng: number };
  zoom: number;
  overlays: Map<string, google.maps.Rectangle>;
  getOverlay: (hash: string) => google.maps.Rectangle;
};

export const MapStore = create<MapStoreValue>((_, get) => ({
  map: null,
  overlays: new Map<string, google.maps.Rectangle>(),
  center: { lat: 40.719222, lng: -73.926365 },

  zoom: 11,
  getOverlay: (hash) => {
    const overlays = get().overlays;
    const map = get().map;

    if (!overlays.has(hash)) {
      const boundingBox = geohash.decode_bbox(hash);

      overlays.set(
        hash,
        new google.maps.Rectangle({
          strokeWeight: 0,
          fillOpacity: 0.75,
          map,
          bounds: {
            north: boundingBox[2],
            south: boundingBox[0],
            east: boundingBox[3],
            west: boundingBox[1],
          },
        }),
      );
    }

    return overlays.get(hash)!;
  },
}));
