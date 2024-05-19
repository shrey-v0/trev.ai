## Configuration Package

This package provides centralized TypeScript configurations for the monorepo, avoiding duplication and ensuring a single point of control for all TypeScript settings.

## Configuration Files

- **base.json**: The base configuration used across all projects.
- **nextjs.json**: Configuration specific to Nextjs dir.
- **react-library.json**: Configuration tailored for React libraries.

## Usage

To use these configurations in the project, reference them in the `tsconfig.json` files using `extends` keyword. For example:

```json
{
  "extends": "@trev/tsconfig/nextjs.json",
  "compilerOptions": {
    // Your specific overrides
  }
}
```

This setup ensures consistency and simplifies the management of TypeScript configurations across the monorepo.
