import dotenv from 'dotenv';

dotenv.config();

const developing = process.env.NODE_ENV === 'development';

export function log(...args) {
  if (developing) {
    console.log(...args);
  } else {
    // console.log("Log not available");
  }
}
