const menuItemReviewFixtures = {
    oneReview: {
        "id": 1,
        "itemId": 2,
        "reviewerEmail": "cgaucho@ucsb.edu",
        "stars": 5,
        "dateReviewed": "2022-01-02T12:00:00",
        "comments": "Very nice!"
    },
    threeReviews: [
        {
            "id": 1,
            "itemId": 2,
            "reviewerEmail": "cgaucho@ucsb.edu",
            "stars": 5,
            "dateReviewed": "2022-01-02T12:00:00",
            "comments": "Very nice!"
        },
        {
            "id": 2,
            "itemId": 4,
            "reviewerEmail": "abcabc@ucsb.edu",
            "stars": 1,
            "dateReviewed": "2022-01-04T12:00:00",
            "comments": "Not again!"
        },
        {
            "id": 3,
            "itemId": 6,
            "reviewerEmail": "abc@ucsb.edu",
            "stars": 3,
            "dateReviewed": "2022-01-06T12:00:00",
            "comments": "Not bad."
        }
    ]
};


export { menuItemReviewFixtures };