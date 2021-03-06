import React from "react";
import { fetchForecastWeather } from "../logics/api";
import { ForecastWeather } from "../types";
import { inRange } from "../logics/utils";

const DEFAULT_NUMBER_OS_DAYS = 7;

export const useFetchForecast = () => {
  const [forecast, setForecst] = React.useState<ForecastWeather | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const createFetch = React.useCallback(
    ({ days, cityName }) => () => {
      if (loading) return;
      setLoading(true);
      const _days = inRange(days) ? days : DEFAULT_NUMBER_OS_DAYS;
      fetchForecastWeather(cityName, _days)
        .then((data) => {
          if (!data) return;
          setForecst(data);
        })
        .catch((err) => console.log("oh, err", err))
        .finally(() => setLoading(false));
    },
    [loading]
  );

  return {
    loading,
    forecast,
    createFetch,
  };
};
