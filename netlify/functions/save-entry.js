exports.handler = async (event) => {
    try {
        const formData = JSON.parse(event.body);
        
        // Add your database integration here (e.g., FaunaDB, Supabase)
        // For now, just return the submitted data
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Entry saved successfully",
                data: formData
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save entry" })
        };
    }
};
