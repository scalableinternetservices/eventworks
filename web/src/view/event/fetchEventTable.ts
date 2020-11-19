import { gql } from '@apollo/client';
import { fragmentEventTable } from '../../graphql/fetchEvent';

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
      ...EventTable
    }
  }
  ${fragmentEventTable}
`