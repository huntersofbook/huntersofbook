import { createServer } from 'node:http'
import { offsetForArgs } from '@huntersofbook/relay-cursor-paging'
import { connectionFromArraySlice } from 'graphql-relay'
import { GraphQLError } from 'graphql'
import { createSchema, createYoga } from 'graphql-yoga'

const data = [
  {
    id: 1,
    name: 'Library 1',
  },
  {
    id: 2,
    name: 'Library 2',
  },
  {
    id: 3,
    name: 'Library 3',
  },
  {
    id: 4,
    name: 'Library 4',
  },
]

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    scalar Cursor

    type PageInfo {
      hasNextPage: Boolean
      hasPreviousPage: Boolean
      startCursor: Cursor
      endCursor: Cursor
      totalPageCount: Int
    }

    type Library {
      id: ID!
      name: String!
    }

    type LibraryEdge {
        cursor: String!
        node: Library!
    }

    type LibraryConnection {
      edges: [LibraryEdge!]!
      pageInfo: PageInfo!
    }
 
    type Query {
      libraries(
        first: Int
        after: Cursor
        last: Int
        before: Cursor
      ): LibraryConnection  
    }
  `,
  resolvers: {
    Query: {
      libraries: async (_parent, _args, context, _info) => {
        const { limit, offset, expectedSize, hasNextPage,hasPreviousPage } = offsetForArgs({
          args: {
            first: _args.first,
            last: _args.last,
            after: _args.after,
            before: _args.before,
          },
        })
        console.log(hasNextPage(data.length))

        if (!data)
          throw new GraphQLError('No libraries found')

        const page = connectionFromArraySlice(data, _args, {
          arrayLength: data.length,
          sliceStart: offset,
        })
        return {
          edges: page.edges,
          pageInfo: {
            ...page.pageInfo,
            totalPageCount: expectedSize,
          },
        }
      },
    },
  },
})

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema })

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
