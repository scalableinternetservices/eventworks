import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { UpdateUser, UpdateUserVariables, UserInput } from '../../graphql/query.gen'
import { fragmentUser } from './fetchUser'

const updateUserMutation = gql `
mutation UpdateUser($input: UserInput!) {
  updateUser(input: $input){
    name
    title
    email
    linkedinLink
    ...User
  }
}
  ${fragmentUser}
`
export function updateUser(client: ApolloClient<any>, input: UserInput) {
  return getApolloClient().mutate<UpdateUser, UpdateUserVariables>({
    mutation: updateUserMutation,
    variables: { input },
  })
}
