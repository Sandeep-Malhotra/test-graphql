import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication  } from 'graphql-modules';
import { bookModule } from './modules/index.js';

const application = createApplication({
    modules:[bookModule]
});
// Following commented lines of code is not working 
// const executor = application.createApolloExecutor();
// const typeDefs = application.typeDefs;
// const resolvers = application.resolvers;
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

const schema = application.schema;
const modules = application.ɵconfig.modules;
const server = new ApolloServer({schema:schema});

const { url } = await startStandaloneServer(server,{
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);