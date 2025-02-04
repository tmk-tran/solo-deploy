const { gql } = require("@apollo/client");

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user_id
    }
  }
`;

const EDIT_USER_MUTATION = gql`
  mutation UpdateUser($user_id: ID!, $input: userInput!) {
    update_user(user_id: $user_id, input: $input) {
      user_id
      username
    }
  }
`;

module.exports = { CREATE_USER_MUTATION, EDIT_USER_MUTATION };
