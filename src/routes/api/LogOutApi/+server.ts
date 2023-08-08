import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import ConsolePrintWarn, {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const credentials: Credentials = await request.json();

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {
            email: credentials.email,
        };
        const success = await usersCollection.findOne(query);

        if (success) {
            ConsolePrintOK("LoginAPI API RESPONSE: status 200")

            await usersCollection.updateOne(query, {$set: {token: null}})
            return new Response(JSON.stringify({}), {status: 200})
        } else {
            ConsolePrintWarn("LoginAPI API RESPONSE: status 401")
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
