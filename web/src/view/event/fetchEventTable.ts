import { gql } from '@apollo/client';
import { fragmentEventTable } from '../../graphql/fetchEvent';

export const subscribeEventTable = gql`
  subscription EventTableSubscription($eventTableId: Int!) {
    tableUpdates(eventTableId: $eventTableId) {
      ...EventTable
    }
  }
  ${fragmentEventTable}
`