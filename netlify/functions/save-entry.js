exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        
        // Basic validation
        if (!data.message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message is required" })
            };
        }

        // Here you would typically save to a database
        // For now, we'll just return the data
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            body: JSON.stringify({
                message: "Entry saved successfully",
                data: {
                    ...data,
                    timestamp: new Date().toISOString()
                }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: "Internal server error" })
        };
    }
};
