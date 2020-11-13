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

  }
`