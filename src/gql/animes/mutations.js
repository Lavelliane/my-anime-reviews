import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation Login($input: UsersPermissionsLoginInput!){
  login(input: $input){
    jwt
    user {
      id
    }
  }
}
`

export const CREATE_REVIEW = gql`
mutation CreateReview($data: ReviewInput!){
  createReview(data: $data){
    data {
      id
    }
  }
} 
`