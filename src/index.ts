import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createApplication } from "graphql-modules";
import { bookModule } from "./modules/index.js";
import { useGraphQLModules } from "@envelop/graphql-modules";

const application = createApplication({
  modules: [bookModule],
});
const server = new ApolloServer({
  // schema: application.createSchemaForApollo() // graphql-modules has marked this deprecated, but works with Apollo Server 4.
  // Recommended approach is to use gateway:
  gateway: {
    async load() {
      return { executor: application.createApolloExecutor() };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: application.schema } as any);
      return () => {};
    },
    async stop() {},
  },
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
