import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self {
      id
      name
      userType
      email
      title
      linkedinLink
      table {
        id
        name
      }
    }
  }
`

export const fragmentUser = gql`
  fragment User on User {
    id
    userType
    email
    name
    title
    linkedinLink
    table {
      id
      name
    }
  }
`