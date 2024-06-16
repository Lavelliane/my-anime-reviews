import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
query Animes {
  animes {
    data {
      id
      attributes{
        reviews {
          data {
            id
            attributes {
              title
              rating
              author
              body
              createdAt
            }
          }
        }
        title
        synopsis
        season
        genre
        alt
        episodes
        image {
          data {
            attributes {
              url
              previewUrl
            }
          }
        }
        createdAt
        
      }
    }
  }
}
`

export const GET_ANIME = gql`
query Anime($id: ID){
  anime(id: $id){
    data {
      id
      attributes{
        reviews {
          data {
            id
            attributes {
              title
              rating
              author
              body
              createdAt
            }
          }
        }
        title
        synopsis
        season
        genre
        alt
        episodes
        image {
          data {
            attributes {
              url
              previewUrl
            }
          }
        }
        createdAt
      }
    }
  }
}
`