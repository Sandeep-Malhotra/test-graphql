import { createModule, gql } from 'graphql-modules'

export const bookModule = createModule({
    id: 'book-module',
    dirname: 'book',
    typeDefs: [
      gql`
        type Book {
            title: String
            author: String
        }
        type Query {
            books: [Book]
        }
      `
    ],
    resolvers: {
        Query: {
            books: () => {
                return [
                    {
                      title: 'The Awakening',
                      author: 'Kate Chopin',
                    },
                    {
                      title: 'City of Glass',
                      author: 'Paul Auster',
                    },
                  ]            
            },
          },
    }
  })