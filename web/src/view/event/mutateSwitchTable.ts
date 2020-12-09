import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { SwitchTable, SwitchTableInput, SwitchTableVariables } from '../../graphql/query.gen'
import { fragmentUser } from '../auth/fetchUser'

export const switchTableMutation = gql`
  mutation SwitchTable($input: SwitchTableInput!) {
    switchTable(input: $input) {
      ...User
    }
  }
  ${fragmentUser}
`

export function switchTable(client: ApolloClient<any>, input: SwitchTableInput) {
  return getApolloClient().mutate<SwitchTable, SwitchTableVariables>({
    mutation: switchTableMutation,
    variables: { input }
  })
}