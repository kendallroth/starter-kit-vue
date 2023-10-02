import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    // Prevent returning null from `t` functions (reduces errors with assigning where null is unexpected)
    returnNull: false;
  }
}
