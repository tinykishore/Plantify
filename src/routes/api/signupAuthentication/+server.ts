import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import ConsolePrintWarn, {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";


// @ts-ignore
export const POST = async ({request}) => {
    const auth = await request.json();
    const email = auth.email_address;
    const password = auth.password;
    const confirmPassword = auth.confirm_password;
    const firstName = auth.first_name;
    const lastName = auth.last_name;

    console.log(email, password, confirmPassword, firstName, lastName);

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName};
        const user = await usersCollection.insertOne(query);
        if (user) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(auth), {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify(null), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}