const helpRequestsFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "sampleemail1@gmail.com",
        "teamId": "w24-4pm-4",
        "tableOrBreakoutRoom": "string",
        "requestTime": "2024-02-14T02:13:33",
        "explanation": "string",
        "solved": true
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "sample11@gmail.com",
            "teamId": "w24-4pm-4",
            "tableOrBreakoutRoom": "string",
            "requestTime": "2024-02-14T02:13:33",
            "explanation": "string",
            "solved": true
        },
        {
            "id": 2,
            "requesterEmail": "sample12@gmail.com",
            "teamId": "w24-4pm-4",
            "tableOrBreakoutRoom": "sstring",
            "requestTime": "2024-03-14T02:13:23",
            "explanation": "strings",
            "solved": false
        },
        {
            "id": 3,
            "requesterEmail": "sample13@gmail.com",
            "teamId": "w24-4pm-4",
            "tableOrBreakoutRoom": "strasing",
            "requestTime": "2024-02-14T02:13:13",
            "explanation": "strisdang",
            "solved": true
        }
            
    ]
    
};


export { helpRequestsFixtures };