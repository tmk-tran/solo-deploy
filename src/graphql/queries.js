import { gql } from "@apollo/client";

// export const LOGIN_USER = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         name
//       }
//     }
//   }
// `;

export const GET_GAMES_BY_USER = gql`
  query GetGamesByUser($filter: String!, $orderBy: [String!]) {
    games(filter: $filter, ordering: $orderBy) {
      game_id
      user_id
      game_date
      game_notes
      total_game_score
      target_name
      target_score_value
    }
  }
`;
