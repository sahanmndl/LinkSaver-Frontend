import axios from "axios";

async function createLinksScript() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRkYTE5MzYyYmE3OTgzMGRjNTc4NDYiLCJlbWFpbElkIjoibW9uZGFsc2FoYW4wNTNAZ21haWwuY29tIiwiaWF0IjoxNzI3MDEyMTcwLCJleHAiOjE3MjcwMTMwNzB9.NywlsgKn1HAOFBaoiS-t2psuKcT7dEfKGVIjb3qRW2E"
    
    for (let i = 0; i <= 50; i++) {
        const body = {
            title: `Title: ${i}`,
            description: `Description: ${i}`,
            url: `https://www.google.com/search?q=${i}`,
            tags: ["physics", "chemistry"]
        };

        try {
            const response = await axios.post(`http://localhost:8008/api/v1/link`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Link created ${i}: `, response.data.body);
        } catch (e) {
            console.error(`Error creating link ${i}:`, e.response.data);
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

createLinksScript();