const{ buildSchema } = require('graphql');

const schema =  buildSchema(` 
type Review { 
  id: ID!
  usuario: String!
  videojuego: String!
  review: String!
}
input ReviewInput { 
  usuario: String!
  videojuego: String!
  review: String!
  token: String!
 }
type Query { 
  reviewID(id: ID!): Review
  reviews: [Review]
  reviewsOneUser(reviewInput: ReviewInput): [Review]
  OneReview(reviewInput: ReviewInput): Review
}
type Mutation { 
  createReview(reviewInput: ReviewInput): String!
  reviewsOneUser(reviewInput: ReviewInput): String!
  deleteReview(id: ID!): String!
  updateReview(id: ID!, reviewInput: ReviewInput): String!
}
schema { 
  query: Query
  mutation: Mutation
}
`)

module.exports = schema;
