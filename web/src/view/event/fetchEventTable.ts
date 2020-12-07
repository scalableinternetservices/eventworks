import { gql } from '@apollo/client';

export const fetchAllEventTables = gql`
  query FetchAllEventTables {
    tables {
      id
      name
      description
      userCapacity
      head {
        id
        name
      }
      participants {
        id
        name
      }
    }
  }
`

export const subscribeEventTable = gql`
  subscription EventTableSubscription($eventTableId: Int!) {
    tableUpdates(eventTableId: $eventTableId) {
      id
      name
    }
  }
`