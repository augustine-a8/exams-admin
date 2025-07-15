import { gql } from "@apollo/client";

export const GET_SIGNATURES = gql`
  query GetSignatures($pageNumber: Int, $itemsPerPage: Int) {
    getSignatures(pageNumber: $pageNumber, itemsPerPage: $itemsPerPage) {
      signatures {
        _id
        imageUrl
        user {
          _id
          name
          category
        }
        room {
          _id
          name
        }
        session
        signedAt
        duration
      }
      pageInfo {
        start
        end
        total
      }
    }
  }
`;
