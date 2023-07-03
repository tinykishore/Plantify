import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import ConsolePrintWarn, {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";


// @ts-ignore
export const POST = async ({request}) => {
    const credentials = await request.json();
    const email = credentials['email'];
    const password = credentials['password'];

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {email: email, password: password};
        const user = await usersCollection.findOne(query);

        if (user) {
            ConsolePrintOK("LoginAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(credentials), {status: 200})
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