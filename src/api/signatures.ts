import { gql } from "@apollo/client";

export const GET_PAGINATED_SIGNATURES = gql`
  query GetPaginatedSignatures($pageNumber: Int, $itemsPerPage: Int) {
    getPaginatedSignatures(
      pageNumber: $pageNumber
      itemsPerPage: $itemsPerPage
    ) {
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

export const FILTER_SIGNATURES = gql`
  mutation FilterSignature(
    $examSupport: String
    $filterOptions: FilterSignatureOptions
    $pageNumber: Int
    $itemsPerPage: Int
  ) {
    filterSignatures(
      examSupport: $examSupport
      filterOptions: $filterOptions
      pageNumber: $pageNumber
      itemsPerPage: $itemsPerPage
    ) {
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
        duration
        signedAt
      }
      pageInfo {
        start
        end
        total
      }
    }
  }
`;
