import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self {
      id
      name
      userType
      email
    }
  }
`

export const fragmentUser = gql`
  fragment User on User {
    id
    userType
    email
    name
  }
`