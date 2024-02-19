const recommendationRequestFixtures = {
    oneRecommendationRequest: {
        "id": 1,
        "requesterEmail": "example1@ucsb.edu",
        "professorEmail": "profemail@ucsb.edu",
        "explanation": "explanation1",
        "dateRequested": "2024-01-01T00:00:00",
        "dateNeeded": "2024-01-05T00:00:00",
        "done": false
    },
    threeRecommendationRequests: [
        {
            "id": 1,
            "requesterEmail": "example12@ucsb.edu",
            "professorEmail": "prof1email@ucsb.edu",
            "explanation": "explanation1",
            "dateRequested": "2024-01-01T00:00:01",
            "dateNeeded": "2024-01-06T00:00:00",
            "done": true
        },
        {
            "id": 2,
            "requesterEmail": "example18@ucsb.edu",
            "professorEmail": "prof2email@ucsb.edu",
            "explanation": "explanation2",
            "dateRequested": "2024-01-01T00:00:02",
            "dateNeeded": "2024-01-07T00:00:00",
            "done": false
        },
        {
            "id": 3,
            "requesterEmail": "example09@ucsb.edu",
            "professorEmail": "prof3email@ucsb.edu",
            "explanation": "explanation3",
            "dateRequested": "2024-01-01T00:00:03",
            "dateNeeded": "2024-01-08T00:00:00",
            "done": true
        }
    ]
}

export { recommendationRequestFixtures };