import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}:any) => {
    const token = await request.json();
    try {
        const database = await connectToMongo();
        const flowersCollection = database.collection('users');
        const query = {token: token.token};
        const loggedIn = await flowersCollection.findOne(query);

        if (loggedIn) {
            ConsolePrintOK("Test API RESPONSE: status 200")
            return new Response(JSON.stringify(loggedIn), {status: 200})
        } else {
            ConsolePrintError("Test API RESPONSE: status 401")
            return new Response(JSON.stringify({}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
