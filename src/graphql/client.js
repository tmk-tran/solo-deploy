/* 
   Sets up Apollo Client to interact with the GraphQL API.
   - Attaches an auth token from localStorage to each request.
   - Uses an HTTP link to define the API endpoint.
   - Implements caching to optimize performance.
*/
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define the GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "https://apidev.devii.io/query",
  // credentials: "include", // tells browser to send cookies with each request, don't need this
});

// Middleware to attach the auth token dynamically
const authLink = setContext((_, { headers }) => {
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken") || ""; // Retrieve token from localStorage
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
