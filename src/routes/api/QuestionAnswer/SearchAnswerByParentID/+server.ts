import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";
import {ObjectId} from "mongodb";

export const POST = async ({request}: any) => {
        const parentId = await request.json();

    // extract the value of the _id property from the request body
    const {_id} = parentId;

    // convert string to ObjectId

    try {
        const database = await connectToMongo();
        const questionAnswerCollection = database.collection('questionAnswer');
        const success = await questionAnswerCollection.findOne({parentQuestionId: _id});

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(success), {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify({}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
