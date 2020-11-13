import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { JoinTableInput, LeaveTable, LeaveTableVariables } from '../../graphql/query.gen'
import { fragmentUser } from '../auth/fetchUser'

export const leaveTableMutation = gql`
  mutation LeaveTable($input: JoinTableInput!) {
    leaveTable(input: $input) {
      ...User
    }
  }
  ${fragmentUser}
`

export function leaveTable(client: ApolloClient<any>, input: JoinTableInput) {
  console.log(input)
  return getApolloClient().mutate<LeaveTable, LeaveTableVariables>({
    mutation: leaveTableMutation,
    variables: { input }
  })
}