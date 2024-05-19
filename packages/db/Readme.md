## Database Setup

This project uses Drizzle for type-safe querying and Neon as our Postgres database provider. Neon offers a serverless Postgres solution, reducing downtime and costs.

### Step-by-Step Instructions

1. **Install Dependencies**

   To start, install the project dependencies by running:

   ```sh
   pnpm install
   ```

2. **Create Environment File**

   At the root of the project folder, create a `.env` file and add the following line, replacing `<YOUR_DATABASE_URL>` with your preferred Neon Postgres URL:

   ```sh
   DATABASE_URL=<YOUR_DATABASE_URL>
   ```

3. **Generate Migrations**

   To generate migrations based on the Drizzle schema, run:

   ```sh
   pnpm generate
   ```

4. **Apply Migrations**

   Apply the migrations stored in your migrations folder and outputted by Drizzle using:

   ```sh
   pnpm migrate
   ```

5. **Seed the Database**

   Run the custom seed script to seed synthetic data into the database:

   ```sh
   pnpm seed
   ```

6. **View Data with Drizzle Studio**

   For a complete view of the data, run Drizzle Studio:

   ```sh
   pnpm studio
   ```

### Additional Notes

- **View DBML Architecture**

   To see the current DBML architecture, run:

   ```sh
   pnpm dbml
   ```

   This will generate and store `schema.dbml` in the project folder.

## Understanding the DBML Architecture

![image](https://github.com/shrey-v0/trev.ai/assets/165524661/eaa5bda9-fa3c-44b4-96f0-f0f760366140)


### Aggregated Events and Event Meta Tables

We use the `aggregated_events` and `event_meta` tables as Redis-style aggregators for our events API metrics:

- **aggregated_events**: This table helps in finding day-based metrics, reducing the complexity and cost of queries on the database by pre-aggregating data.
- **event_meta**: Stores metadata related to events, assisting in the efficient organization and retrieval of event information.

### Tenant Management

Each tenant can have infinite team spaces, and developers can be classified within these team spaces. This classification allows for detailed insights and management of developer per team space.

- **Tenants**: Represent different clients or customers using the system.
- **Team Spaces**: Each tenant can create multiple team spaces for better organization.
- **User Classification**: Developers can be assigned to different team spaces, allowing for granular insights and management.
