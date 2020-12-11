import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'
import { sleep, check } from 'k6'

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'constant-vus',
      vus: 100,
      duration: '600s',

    },
  },
}

export default function () {
    // * * * * * * * * * * GO TO THE HOME PAGE
    http.get('http://localhost:3000/app/index')

    // * * * * * * * * * * GO TO SIGN UP PAGE
    http.get('http://localhost:3000/app/account/')

    // * * * * * * * * * * CREATE RANDOM SIGN UP USER
    var randomNumber = '' + Math.random(1) * 100
    var payload = JSON.stringify({
        email: 'something@gmail.com' + randomNumber,
        name: 'testing',
    })
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    http.post('http://localhost:3000/auth/createUser', payload, params)

    // * * * * * * * * * * GO TO THE PORTAL HOME PAGE
    http.get('http://localhost:3000/app/index')

    // WAIT
    sleep(Math.random() * 3)
    // WAIT

    // * * * * * * * * * * GO TO THE CREATE AN EVENT
    http.get('http://localhost:3000/app/createevent')

    // * * * * * * * * * * CREATE AN EVENT
    let eventCreation = `
        mutation CreateEvents{
            createEvent(input: {startTime:2, endTime:4, userCapacity:1000, name:"Juicy", orgName:"Red Cross", description:"load test", hostId:1}) {
   		        startTime
    	        endTime
    	        userCapacity
    	        name
    	        orgName
                description
            }
        }
    `;

    let resp = http.post('http://localhost:3000/graphql', JSON.stringify({ query: eventCreation }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(resp, { 'Created Event': (r) => r.status == 200 });

    // * * * * * * * * * * GO TO THE CREATE A TABLE
    http.get('http://localhost:3000/app/createtable')

    // * * * * * * * * * * GO TO PROFILE PAGE
    http.get('http://localhost:3000/app/account/')

    // * * * * * * * * * * GO TO EVENT PAGE
    http.get('http://localhost:3000/app/findevents?eventID=1')

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 1)
    let switchTable = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:1}){
                id
                name
            }
        }
    `

    let switchTableResponse = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse, { 'Joined Main Table (USER 1)': (r) => r.status == 200 });

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 2)
    let switchTable1 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:2}){
                id
                name
            }
        }
    `

    let switchTableResponse1 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable1 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse1, { 'Join Main Table (User 2)': (r) => r.status == 200 });

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 3)
    let switchTable2 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:3}){
                id
                name
            }
        }
    `

    let switchTableResponse2 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable2 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse2, { 'Join Main Table (User 3)': (r) => r.status == 200 });

    // * * * * * * * * * * FETCH USERS AT TABLE

    let fetchUserTable5 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable6 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable7 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable8 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    check(fetchUserTable5, { 'fetch user table5': (r) => r.status == 200 });
    check(fetchUserTable6, { 'fetch user table6': (r) => r.status == 200 });
    check(fetchUserTable7, { 'fetch user table7': (r) => r.status == 200 });
    check(fetchUserTable8, { 'fetch user table8': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 1)
    let chatCreation  = `
        mutation SendChatMessage{
            sendMessage(senderId: 1, eventId: 1, tableId: 1, message: "testing") {
                message
            }
        }
    `
    let chatCreationResponse = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(chatCreationResponse, { 'Mutated Chat (User 1)': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 2)

    let chatCreation1  = `
        mutation SendChatMessage{
            sendMessage(senderId: 2, eventId: 1, tableId: 1, message: "testing") {
                message
            }
        }
    `
    let chatCreationResponse1 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation1 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(chatCreationResponse1, { 'Mutated Chat (User 2)': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 3)

    let chatCreation2  = `
        mutation SendChatMessage{
            sendMessage(senderId: 3, eventId: 1, tableId: 1, message: "testing") {
                message
            }
        }
    `
    let chatCreationResponse2 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation2 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(chatCreationResponse2, { 'Mutated Chat (User 3)': (r) => r.status == 200 });

    //* * * * * * * * * * FETCH CHAT MESSAGES

    let chatResponse = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let chatResponse2 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let chatResponse3 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let chatResponse4 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    check(chatResponse, { 'Fetch Chat 1': (r) => r.status == 200 });
    check(chatResponse2, { 'Fetch Chat 2': (r) => r.status == 200 });
    check(chatResponse3, { 'Fetch Chat 3': (r) => r.status == 200 });
    check(chatResponse4, { 'Fetch Chat 4': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 1)
    let chatCreation3  = `
    mutation SendChatMessage{
        sendMessage(senderId: 1, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse3 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation3 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse3, { 'Mutated Chat (User 1) 2': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 2)

    let chatCreation4  = `
    mutation SendChatMessage{
        sendMessage(senderId: 2, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse4 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation4 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse4, { 'Mutated Chat (User 2) 2': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 3)

    let chatCreation5  = `
    mutation SendChatMessage{
        sendMessage(senderId: 3, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse5 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation5 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse5, { 'Mutated Chat (User 3) 2': (r) => r.status == 200 });

    //* * * * * * * * * * FETCH CHAT MESSAGES

    let chatResponse5 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse6 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse7 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse8 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    check(chatResponse5, { 'Fetch Chat 5': (r) => r.status == 200 });
    check(chatResponse6, { 'Fetch Chat 6': (r) => r.status == 200 });
    check(chatResponse7, { 'Fetch Chat 7': (r) => r.status == 200 });
    check(chatResponse8, { 'Fetch Chat 8': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 1)
    let chatCreation6  = `
    mutation SendChatMessage{
        sendMessage(senderId: 1, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse6 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation6 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse6, { 'Mutated Chat (User 1) 3': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 2)

    let chatCreation7  = `
    mutation SendChatMessage{
        sendMessage(senderId: 2, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse7 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation7 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse7, { 'Mutated Chat (User 2) 3': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 3)

    let chatCreation8  = `
    mutation SendChatMessage{
        sendMessage(senderId: 3, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse8 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation8 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse8, { 'Mutated Chat (User 3) 3': (r) => r.status == 200 });

    //* * * * * * * * * * FETCH CHAT MESSAGES

    let chatResponse9 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse10 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse11 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse12 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    check(chatResponse9, { 'Fetch Chat 9': (r) => r.status == 200 });
    check(chatResponse10, { 'Fetch Chat 10': (r) => r.status == 200 });
    check(chatResponse11, { 'Fetch Chat 11': (r) => r.status == 200 });
    check(chatResponse12, { 'Fetch Chat 12': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 1)
    let chatCreation9  = `
    mutation SendChatMessage{
        sendMessage(senderId: 1, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse9 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation9 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse9, { 'Mutated Chat (User 1) 4': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 2)

    let chatCreation10  = `
    mutation SendChatMessage{
        sendMessage(senderId: 2, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse10 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation10 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse10, { 'Mutated Chat (User 2) 4': (r) => r.status == 200 });

    // * * * * * * * * * * SEND MESSAGE (User 3)

    let chatCreation11  = `
    mutation SendChatMessage{
        sendMessage(senderId: 3, eventId: 1, tableId: 1, message: "testing") {
            message
        }
    }
    `
    let chatCreationResponse11 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation11 }),{
    headers: {
        'Content-Type': 'application/json',
    },
    })

    check(chatCreationResponse11, { 'Mutated Chat (User 3) 4': (r) => r.status == 200 });

    //* * * * * * * * * * FETCH CHAT MESSAGES

    let chatResponse14 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse15 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse16 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    let chatResponse17 = http.post(`http://localhost:3000/graphql`,
    '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    check(chatResponse14, { 'Fetch Chat 14': (r) => r.status == 200 });
    check(chatResponse15, { 'Fetch Chat 15': (r) => r.status == 200 });
    check(chatResponse16, { 'Fetch Chat 16': (r) => r.status == 200 });
    check(chatResponse17, { 'Fetch Chat 17': (r) => r.status == 200 });

    // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 1)
    let switchTable3 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:1}){
                id
                name
            }
        }
    `

    let switchTableResponse3 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable3 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse3, { 'Left Main Table (USER 1)': (r) => r.status == 200 });

    // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 2)
    let switchTable4 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:2}){
                id
                name
            }
        }
    `

    let switchTableResponse4 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable4 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse4, { 'Left Main Table (User 2)': (r) => r.status == 200 });

    // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 3)
    let switchTable5 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:3}){
                id
                name
            }
        }
    `

    let switchTableResponse5 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable5 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse5, { 'Left Main Table (User 3)': (r) => r.status == 200 });

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 1)
    let switchTable6 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:1}){
                id
                name
            }
        }
    `

    let switchTableResponse6 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable6 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse6, { 'Join Main Table (USER 1)': (r) => r.status == 200 });

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 2)
    let switchTable7 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:2}){
                id
                name
            }
        }
    `

    let switchTableResponse7 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable7 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse7, { 'Join Main Table (User 2)': (r) => r.status == 200 });

    // * * * * * * * * * * JOIN MAIN EVENT TABLE (USER 3)
    let switchTable8 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:1, participantId:3}){
                id
                name
            }
        }
    `

    let switchTableResponse8 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable8 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse8, { 'Join Main Table (User 3)': (r) => r.status == 200 });

    let fetchUserTable9 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable10 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable11 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let fetchUserTable12 = http.post(`http://localhost:3000/graphql`,
        '{"operationName":"UsersAtTable","variables":{"tableId":1},"query":"query UsersAtTable($tableId: Int!){usersAtTable(tableId: $tableId){id}}"}',
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    check(fetchUserTable9, { 'fetch user table9': (r) => r.status == 200 });
    check(fetchUserTable10, { 'fetch user table10': (r) => r.status == 200 });
    check(fetchUserTable11, { 'fetch user table11': (r) => r.status == 200 });
    check(fetchUserTable12, { 'fetch user table12': (r) => r.status == 200 });

        // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 1)
        let switchTable9 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:1}){
                id
                name
            }
        }
    `

    let switchTableResponse9 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable9 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse9, { 'Leave Main Table (USER 1)': (r) => r.status == 200 });

    // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 2)
    let switchTable10 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:2}){
                id
                name
            }
        }
    `

    let switchTableResponse10 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable10 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse10, { 'Leave Main Table (User 2)': (r) => r.status == 200 });

    // * * * * * * * * * * LEAVE MAIN EVENT TABLE (USER 3)
    let switchTable11 = `
        mutation SwitchTable{
            switchTable(input: {eventId:1, eventTableId:null, participantId:3}){
                id
                name
            }
        }
    `

    let switchTableResponse11 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable11 }),{
        headers: {
            'Content-Type': 'application/json',
        },
    })

    check(switchTableResponse11, { 'Leave Main Table (User 3)': (r) => r.status == 200 });

  }
const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}