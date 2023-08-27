export const load = async ({fetch, params}: any) => {
    let id = params.id;
    const response = await fetch('/api/competitions/GetAllImagesByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: id})
    });

    const images = await response.json();

    console.log(images)

    return {
        images: JSON.stringify(images),
        id: id
    }
}