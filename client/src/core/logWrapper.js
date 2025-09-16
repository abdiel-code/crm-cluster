const development = process.env.NODE_ENV === "development";

export const log = (...args) => {
  if (development) {
    console.log(...args);
  }
};
