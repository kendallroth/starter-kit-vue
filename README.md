# StarterKit - Vue

This template should help get you started developing with Vue 3 with common patterns.

- **Pinia** - State management
- **Vue Query** - Data fetching / caching
- **Internationalization**
- **Vuetify** - Component library
- **Themes** - Dark / light modes
- **Debug** - Debug utilities

## IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - Enable Volar TS [Take Over mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) for best performance

## Project Setup

```sh
# Install dependencies
npm install
```

### Scripts

| Script | Description |
|--------|-------------|
| `build` | Type check, compile, minify for production
| `dev` | Compile and hot-reload for development
| `test` | Run Vitest unit tests
| `type` | Run type checking

### Linting / Formatting

> **NOTE:** Ideally [BiomeJS](https://biomejs.dev/) would be used for formatting and linting; however, it does not support Vue yet (WIP)!

## Development

- [x] App theming
- [x] Localization
- [x] Short keys / debug
  - TODO: Must fix to be platform specific!
- [x] Form components
  - Wrappers should extend Vuetify components to retain props
- [ ] Validation localization
- [ ] Vue Query (queries, pagination, mutations)
- [ ] MSW endpoints (with fixtures)
- [ ] Form submission (success/failure)
  - Should set form-level server error for API errors
  - Error message utilities

### Forms

#### VeeValidate

##### Custom Field Components

Custom form fields bound with `vee-validate` should **not** have `initialValue` specified in `useField()`! This will apparently overwrite the form's `initialValues`, which undesired behaviour! This does mean that if the form does not specify default values for all fields with `initialValues`, any unspecified fields will be `undefined` on submit!

##### Schema Files

Forms typically have a `schema.ts` file with several exports.

- Yup schema
  - Yup validation schema (required separately for inferring type)
- Yup schema (typed)
  - Wrapped Yup schema with transformations applied during validation/submit
- Schema TS type
  - Inferred TS type from Yup schema (useful for default values, form-related types, etc)
- Default values
  - Default/initial values for empty form (useful for VeeValidate `initialValues`, resetting form, etc)

##### Caveats

Unlike React Hook Form, VeeValidate forms are limited to one per parent component. Since the context is provided to children via injection, there would be no way to differentiate forms.

Unlike React Hook Form, there is no documented way to access the entire form context from a child component. However, since form context is provided in parent components utilizing `useForm`, it can be injected in child components with `inject(FormContextKey)`. This will be potentially `undefined` (can handle with `assert`) and must be cast from `PrivateFormContext` to `FormContext`. A utility hook has been created to address this (`useFormContext`), and a [GitHub issue](https://github.com/logaretm/vee-validate/issues/4490) opened to request in VeeValidate.

Using the inferred form types (from Yup schema) may cause issues when wishing to set empty intial values for fields marked as `required()`. This can be circumvented in the initial values declaration by using the `SetOptional` type from `type-fest` to set various keys as optional on the initial values object. Since the `useForm` permits passing partial initial values, setting some as optional is permitted. However, actually modifying/replacing field types will cause issues with initial values!

### SASS

#### Vuetify

To reference Vuetify variables/settings, the `vuetify/settings` stylesheet can be imported.

```scss
@use "vuetify/settings" as v;

:root {
  --v-spacer: #{v.$spacer};
}
```

#### Debugging

Occasionally debugging SASS variables (especially from Vuetify) may be helpful. The `@debug` keyword allows printing a variable in the development console while compiling.

```scss
$variable: 10px;

@debug $variable;
@debug "$variable is '#{$variable}'";
```
