import { create } from "zustand";

type RGB = [number, number, number];

export type OptionsStoreValue = {
  startYear: number;
  endYear: number;
  startColor: RGB;
  endColor: RGB;
  startHeight: number;
  endHeight: number;
  precision: number;
  saved: boolean;
};

export const OptionsStore = create<OptionsStoreValue>(() => ({
  startYear: 0,
  endYear: new Date().getFullYear(),
  startColor: [123, 237, 159],
  endColor: [255, 71, 87],
  startHeight: 0,
  endHeight: 100,
  precision: 7,
  saved: false,
}));
