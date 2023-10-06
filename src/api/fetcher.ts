import axios from "axios";

import { appConfig } from "#config/app";

/** API axios instance */
export const api = axios.create({
  baseURL: appConfig.links.api,
});
