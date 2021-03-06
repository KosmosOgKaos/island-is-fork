# Generating a New Project

## Generate a component

To generate a new React component in island-ui-core.

```bash
yarn generate @nrwl/react:component MyComponent --project=island-ui-core
```

## Generate an application

To generate a simple React application:

```bash
yarn generate @nrwl/react:app my-app
```

To get a React application with server-side-rendering, we recommend using Next.JS:

```bash
yarn generate @nrwl/next:app my-app
```

To create a service, you can get started with NestJS like this:

```bash
yarn generate @nrwl/nest:app services/my-service
```

{% hint style="info" %}
You might want to check out our reference [NextJS](https://github.com/island-is/island.is/tree/main/apps/reference-next-app) and [NestJS](https://github.com/island-is/island.is/tree/main/apps/reference-backend) projects.
{% endhint %}

{% hint style="info" %}
For NextJS projects, be sure to configure our [custom NextJS server](../technical-overview/devops/next-server.md).
{% endhint %}

## Generate a library

To generate a React library.

```bash
yarn generate @nrwl/react:lib my-lib --linter eslint
```

To create a NestJS module:

```bash
yarn generate @nrwl/nest:lib my-lib
```

To create a JS library that can be used both on the frontend and the backend:

```bash
yarn generate @nrwl/node:lib my-lib
```

Libraries are sharable across libraries and applications. They can be imported from `@island.is/my-lib`.

Applications and libraries can be structured in a hierarchy using subfolders:

```bash
yarn generate @nrwl/node:lib common/my-lib

# Imported from '@island.is/common/my-lib'
```

## Migrations

Using the `sequelize-cli` we support version controlled migrations that keep track of changes to the database.

### Generate a migrations

```bash
yarn nx run <project>:migrate/generate
```

### Migrating

```bash
yarn nx run <project>:migrate
```
