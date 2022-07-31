export const param = (field: any, value: any) => {
  const parameter = `${field ? `&${field}=${value}` : ""}`;
  return parameter;
};

export const paramQuery = (payload: any) => {
  let query = payload ? "?" : "";
  for (const key in payload) {
    query += param(key, payload[key]);
  }
  return query;
};

export const paramTrim = (url: string) => {
  return url.replace(/\s+/g, "");
};
