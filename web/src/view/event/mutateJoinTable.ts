import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { JoinTable, JoinTableInput, JoinTableVariables } from '../../graphql/query.gen'
import { fragmentUser } from '../auth/fetchUser'

export const joinTableMutation = gql`
  mutation JoinTable($input: JoinTableInput!) {
    joinTable(input: $input) {
      ...User
    }
  }
  ${fragmentUser}
`

export function joinTable(client: ApolloClient<any>, input: JoinTableInput) {
  return getApolloClient().mutate<JoinTable, JoinTableVariables>({
    mutation: joinTableMutation,
    variables: { input }
  })
}