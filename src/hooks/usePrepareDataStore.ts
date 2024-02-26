import { useCallback, useEffect, useMemo, useState } from "react";
import { Building, DataStore, Hash, Precision } from "../stores/data.ts";
import geohash from "ngeohash";

export const usePrepareDataStore = () => {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = useCallback(async () => {
    const rows: number[][] = await fetch("/data.json", {
      cache: "force-cache",
    }).then((r) => r.json());

    const genId = () => Math.floor(Math.random() * 10000000000000);
    const genHashes = (lat: number, lng: number) => {
      // @ts-expect-error will be filled in for loop
      const hashes: Hash = {};

      for (let i = 5; i <= 9; i++) {
        hashes[i as Precision] = geohash.encode(lat, lng, i);
      }

      return hashes as Hash;
    };
    return rows.map(([id, height, ground, year, lng, lat]) => ({
      id: id ?? genId(),
      height,
      ground,
      year,
      lat,
      lng,
      hash: genHashes(lat, lng),
    })) as Building[];
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
