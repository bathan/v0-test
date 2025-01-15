import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, // Ensure this environment variable is set correctly
  fetchOptions: {
    method: 'POST', // Explicitly ensure POST is used
    credentials: 'include' // Use 'include' to send cookies if required by the API
  },
  headers: {
    'Content-Type': 'application/json',
    'apollo-require-preflight': 'true' // Explicitly include this header for Apollo CSRF prevention
  }
})

console.log('API Endpoint:', process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT)

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors) {
      console.error(`[GraphQL Errors]:`, graphQLErrors)
    }
    if (networkError) {
      console.error(`[Network Error]:`, networkError)
    }
    if (response) {
      console.log(`[Response]:`, response)
    }
    if (operation) {
      console.log(`[Operation]:`, operation)
    }
  }
)
const loggingLink = new ApolloLink((operation, forward) => {
  //console.log(`GraphQL Request:`, operation)
  return forward(operation).map((response) => {
    //console.log(`GraphQL Response:`, response)
    return response
  })
})

const authLink = new ApolloLink((operation, forward) => {
  const token = 'Mellon1414' // localStorage.getItem("authToken"); // Retrieve the token
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'apollo-require-preflight': 'true'
    }
  }))
  return forward(operation)
})

// Ensure the terminating link (httpLink) is the last in the chain
const link = ApolloLink.from([authLink, loggingLink, errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
