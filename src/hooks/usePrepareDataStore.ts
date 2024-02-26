import { useCallback, useEffect, useMemo, useState } from "react";
import { Precision, Hash, Building, DataStore } from "../stores/data.ts";
import geohash from "ngeohash";

export const usePrepareDataStore = () => {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = useCallback(async () => {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle("data.json", { create: true });
    const file = await fileHandle.getFile();

    if (file.size) {
      console.log("loaded from ofps");
      const text = await file.text();
      return JSON.parse(text) as Building[];
    }

    const rows: number[][] = await fetch("/data.json").then((r) => r.json());

    const genId = () => Math.floor(Math.random() * 10000000000000);
    const genHashes = (lat: number, lng: number) => {
      // @ts-expect-error will be filled in for loop
      const hashes: Hash = {};

      for (let i = 5; i <= 9; i++) {
        hashes[i as Precision] = geohash.encode(lat, lng, i);
      }

      return hashes as Hash;
    };
    const data = rows.map(([id, height, ground, year, lng, lat]) => ({
      id: id ?? genId(),
      height,
      ground,
      year,
      lat,
      lng,
      hash: genHashes(lat, lng),
    })) as Building[];

    const text = JSON.stringify(data);
    const accessHandle = await fileHandle.createWritable();
    await accessHandle.write(text);
    await accessHandle.close();

    console.log("loaded into ofps");

    return data;
  }, []);

  useEffect(() => {
    getData()
      .then((data) => {
        DataStore.setState({ buildings: data });
        setReady(true);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err);
          console.log(err);
        } else {
          alert("Something really bad happened!");
          console.error(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getData]);

  return useMemo(
    () => ({
      loading,
      ready,
      error,
    }),
    [loading, ready, error],
  );
};
