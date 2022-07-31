import moment from "moment";

/**general */
export const dateFormat = (date: Date | string) => {
  const newDate = moment(date).format("MM-DD-YYYY");
  return newDate;
};

/**format for API query request */
export const dateTimeApi = (date: Date) => {
  const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return newDate;
};

export const dateApi = (date: Date | string) => {
  const newDate = moment(date).format("YYYY-MM-DD");
  return newDate;
};
