import { gql } from '@apollo/client';

export const subscribeEventTable = gql`
  subscription EventTableSubscription($eventTableId: Int!) {
    tableUpdates(eventTableId: $eventTableId) {
      id
      name
    }
  }
`