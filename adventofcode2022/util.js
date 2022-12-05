import { readFileSync } from "fs";

export const loadData = (fileName) => {
  return readFileSync(new URL(`./${fileName}`, import.meta.url), {
    encoding: "utf8",
  }).toString();
};

export const sumItems = (sum, item) => {
  return sum += Number(item);
}