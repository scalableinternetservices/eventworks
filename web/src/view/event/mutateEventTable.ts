import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { fragmentEventTable } from '../../graphql/fetchEvent'
import { CreateTable, CreateTableVariables, EventTableInput } from '../../graphql/query.gen'

const createTableMutation = gql`
 mutation CreateTable($input: EventTableInput!){
    createTable(input: $input) {
      ...EventTable
    }
  }
  ${fragmentEventTable}
`
export function createTable(client: ApolloClient<any>, input: EventTableInput){
  return getApolloClient().mutate<CreateTable, CreateTableVariables>({
   mutation: createTableMutation,
   variables: { input },
 })
}