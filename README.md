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
- [x] Form base components
- [ ] Validation localization
- [ ] Vue Query (queries, pagination, mutations)
- [ ] MSW endpoints (with fixtures)
- [ ] Form submission (success/failure)
  - Should set form-level server error for API errors

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

Unlike React Hook Form, there is no documented way to access the entire form context from a child component. However, since form context is provided in parent components utilizing `useForm`, it can be injected in child components with `inject(FormContextKey)`. This will be potentially `undefined` (can handle with `assert`) and must be cast from `PrivateFormContext` to `FormContext`.

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
