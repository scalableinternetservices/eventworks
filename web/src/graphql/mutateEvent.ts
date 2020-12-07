import { gql } from '@apollo/client';
import { getApolloClient } from './apolloClient';

export const pingMutation = gql`
  mutation Ping($userId: Int!) {
    ping(userId: $userId)
  }
`

export function ping(userId: number) {
  return getApolloClient().mutate({
    mutation: pingMutation,
    variables: { userId }
  })
}