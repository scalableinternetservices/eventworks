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
      hostedEvents {
        id
        name
        orgName
        userCapacity
        startTime
        endTime
      }
    }
  }
`

export const fetchUsersAtTable = gql`
  query FetchUsersAtTable ($tableId: Int!) {
    usersAtTable (tableId: $tableId) {
      id
      name
    }
  }
`

export const fetchOneUser = gql`
  query FetchOneUser ($userId: Int!) {
    user (userId: $userId) {
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