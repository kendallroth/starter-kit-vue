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
