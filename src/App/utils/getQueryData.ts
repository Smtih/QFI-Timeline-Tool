import queryString from "query-string";

interface QueryData {
  key?: string;
  timeout?: number;
}

function getQueryData(): QueryData {
  const { key, timeout } = queryString.parse(window.location.search);
  return {
    key: typeof key === "string" ? key : undefined,
    timeout:
      typeof timeout === "string" ? Number(timeout) * 60 * 1000 : undefined
  };
}

export { getQueryData };
