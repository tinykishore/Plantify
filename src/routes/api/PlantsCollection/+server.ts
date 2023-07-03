import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const GET = async () => {
    try {

        const database = await connectToMongo();
        const flowersCollection = database.collection('plants');
        const flowers = await flowersCollection.find({}).toArray();

        if (flowers) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(flowers), {status: 200})
        } else {
            ConsolePrintError("PlantsCollection API RESPONSE: status 401")
            return new Response(JSON.stringify({}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
};

// @ts-ignore
export const POST = async ({request}) => {
    const flower = await request.json();
    try {
        const database = await connectToMongo();
        const flowersCollection = database.collection('plants');
        const query = {name: flower.name};

        const flowerExists = await flowersCollection.findOne(query);

        if (flowerExists) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(flowerExists), {status: 200})
        } else {
            ConsolePrintError("PlantsCollection API RESPONSE: status 401")
            return new Response(JSON.stringify({}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}