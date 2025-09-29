const development = import.meta.env.MODE === "development";

export const log = (...args) => {
  if (development) {
    console.log(...args);
  } else {
    //console.log("Log not available");
    return;
  }
};
