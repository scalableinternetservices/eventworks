import { gql } from '@apollo/client'

export const fragmentUser = gql`
  fragment User on User {
    id
    userType
    email
    name
  }
`