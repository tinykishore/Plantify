import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import ConsolePrintWarn, {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";


// @ts-ignore
export const POST = async ({request}) => {
    const auth = await request.json();
    const username = auth.username;
    const password = auth.password;

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {username: username, password: password};
        const user = await usersCollection.findOne(query);
        // simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (user) {
            ConsolePrintOK("LoginAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(auth), {status: 200})
        } else {
            ConsolePrintWarn("LoginAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify(null), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}