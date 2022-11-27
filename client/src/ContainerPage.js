import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EventForm from "./components/EventForm";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/Login";
import SingleEvent from "./pages/SingleEvent";

import { Router, Route, Routes } from "react-router-dom";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("id_token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  // link: authLink.concat(httpLink),
  // link: httpLink,
	uri: '/graphql',
  cache: new InMemoryCache(),
});

export default function ContainerPage() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="/EventForm" element={<EventForm />} />
              <Route path="/events/:eventId" element={<SingleEvent />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
