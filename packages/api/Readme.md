## API Documentation

This API interacts with a Postgres server using Drizzle for database operations and is served behind a tRPC server to ensure type safety.

## Project Tree

```
.
├── index.ts
├── package.json
├── src
│   ├── root.ts             // Creating tRPC server with all routes
│   ├── router              // Route-specific queries classified into smaller blocks
│   │   ├  ...
│   └── trpc.ts             // Exporting `app router` and other crucial tRPC types
└── tsconfig.json
```

## Overview

### tRPC Server

The tRPC server ensures type-safe data interactions. Classifies queries into `protectedProcedures` and `publicProcedures` by defining reusable procedures. More about procedures [here](https://trpc.io/docs/server/procedures)

- **protectedProcedures**: Require session-based authentication, ensuring secure data access.
- **publicProcedures**: Accessible without authentication

### tRPC Context

The tRPC context is set up to utilize frontend cookies and faster access of top-level metrics tenant and teamspace data, ensuring secure and context-aware data handling.

