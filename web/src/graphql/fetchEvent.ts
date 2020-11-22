import { gql } from '@apollo/client'

export const fragmentEvent = gql`
  fragment Event on Event {
    id
    startTime
    endTime
    userCapacity
    name
    orgName
    description
    eventTables {
      id
      name
      description
      userCapacity
      head {
        id
        name
      }
    }
  }
`

export const fragmentEventTable = gql`
  fragment EventTable on EventTable {
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
`
export const fetchAllEvent = gql`
  query FetchAllEvent {
    events {
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