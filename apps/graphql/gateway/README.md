# apps/graphql/gateway

The `graphql-gateway` project is a powerful tool that acts as a gateway for GraphQL APIs. It allows you to aggregate multiple GraphQL services into a single endpoint, providing a unified interface for clients to interact with.

### Apollo Federation v2

In Apollo Federation v2, Apollo Rover and Apollo Router are two key components that work together to enable the federation of multiple GraphQL services into a single gateway.

#### Apollo Rover

Apollo Rover is a tool that helps you define and manage your federated GraphQL schema. It acts as a schema registry and provides a central place to define the types, queries, and mutations for your federated services.

With Apollo Rover, you can define your schema using the GraphQL Schema Definition Language (SDL) and split it into multiple service-specific SDL files. These service SDL files can then be stitched together to create a federated schema.

Rover also provides features like schema validation, linting, and code generation to ensure the consistency and correctness of your federated schema.

#### Apollo Router

Apollo Router is responsible for routing incoming GraphQL requests to the appropriate federated services based on the requested fields.

When a client sends a GraphQL query to the gateway, the Apollo Router analyzes the query and determines which fields belong to which federated service. It then routes the request to the corresponding service for execution.

The router uses the federated schema definition provided by Apollo Rover to understand the relationships between types and services, allowing it to efficiently route requests to the appropriate services.

The router also handles merging the responses from multiple services into a single response that is returned to the client, providing a unified interface for clients to interact with.

Together, Apollo Rover and Apollo Router enable you to build a powerful GraphQL gateway that aggregates multiple GraphQL services into a single endpoint. This allows you to provide a unified interface for clients to interact with, while also benefiting from the modularity and scalability of a federated architecture.

## Configuration

You can check how to install [Apollo Rover](https://github.com/codyslexia/codyslexia/blob/main/scripts/install-apollo-rover.js) and [Apollo Router](https://github.com/codyslexia/codyslexia/blob/main/scripts/install-apollo-router.js) on `<root>/scripts` folder or simply run:

```sh
nx run graphql-gateway:prepare
```

Generated [`supergraph.graphql`](https://github.com/codyslexia/codyslexia/blob/main/apps/graphql/gateway/src/supergraph.graphql) and [`supergraph-production.graphql`](https://github.com/codyslexia/codyslexia/blob/main/apps/graphql/gateway/src/supergraph-production.graphql) are executed with `rover supergraph compose` command and can be triggered by running:

```sh
nx run graphql-gateway:compose
```

<sub>⚡️ Powered by **OSS** — `< >` with ❤️ by [**Moa Torres**](https://github.com/moatorres)</sub>

<sub>NOTE: **Codyslexia** is an unregistered trademark. All rights reserved.</sub>
