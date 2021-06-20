const{ buildSchema } = require('graphql');

const schema =  buildSchema(` 
type Usuario { 
  id: ID!
  usuario: String!
  contrasena: String!
}
input UsuarioInput { 
  usuario: String!
  contrasena: String!
}
type Query { 
  user(id: ID!): Usuario
  users: [Usuario]
}
type Mutation { 
  login(usuarioInput: UsuarioInput): String!
  singUp(usuarioInput: UsuarioInput): String!
  createUser(usuarioInput: UsuarioInput): Usuario
  deleteUser(id: ID!): Usuario
  updateUser(id: ID!, usuarioInput: UsuarioInput): Usuario
}
schema { 
  query: Query
  mutation: Mutation
}
`)

module.exports = schema;
