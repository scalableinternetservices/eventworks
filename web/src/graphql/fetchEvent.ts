import { gql } from '@apollo/client'

const fragmentEventTable = gql`
  fragment EventTable on EventTable {
    id
    name
    description
    userCapacity
    head {
      id
      name
    }
  }
`

export const fetchEvent = gql`
  query FetchEvent($eventId: Int!) {
    event(eventId: $eventId) {
      id
      endTime
      startTime
      description
      name
      orgName
      eventTables {
        ...EventTable
      }
    }
  }
  ${fragmentEventTable}
`

export const fetchTable = gql`
  query FetchTable($tableId: Int!) {
    table(tableId: $tableId) {
      ...EventTable
    }
  }
  ${fragmentEventTable}
`