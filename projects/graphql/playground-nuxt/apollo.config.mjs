module.exports = {
  client: {
    service: {
      name: 'server',
      localSchemaFile: './schema.graphql',
      // url: 'http://localhost:3001/graphql',
      // skipSSLValidation: true,
    },
    includes: ['./src/graphql/*.graphql'],
    excludes: ['./src/graphql/*.ts'],
  },
}
