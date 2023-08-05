import {error, redirect} from "@sveltejs/kit";

export const load = async ({fetch, params}: any) => {
    const plant = params.plant;
    const response = await fetch('/api/PlantsCollection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: plant})
    });

    const data = await response.json();

    if (response.status !== 200) {
        throw error(404)
    } else return {plant: JSON.stringify(data)}
}
