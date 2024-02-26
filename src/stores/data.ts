import { create } from "zustand";

export type Precision = 5 | 6 | 7 | 8;

export type Hash = {
  [key in Precision]: string;
};

export type Building = {
  id: number;
  ground: number;
  height: number;
  year: number;
  lat: number;
  lng: number;
  hash: Hash;
};

export type DataStoreValue = {
  buildings: Building[];
};

export const DataStore = create<DataStoreValue>(() => ({
  buildings: [],
}));
