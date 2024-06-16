import { gql } from '@apollo/client';


export const CREATE_REVIEW = gql`
mutation CreateReview($data: ReviewInput!){
  createReview(data: $data){
    data {
      id
    }
  }
} 
`