import type dayjs from "dayjs";

/** Define globally registered properties in order to provide editor typings */
declare module "vue" {
  export interface ComponentCustomProperties {
    $dayjs: dayjs;
  }
}
