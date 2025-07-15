import { gql } from "@apollo/client";

export const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      _id
      name
    }
  }
`;
