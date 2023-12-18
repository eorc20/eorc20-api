import { toText } from "./cors.js";

export default async function (): Promise<Response> {
  console.log(toText("OK").headers);
  return toText("OK");
}