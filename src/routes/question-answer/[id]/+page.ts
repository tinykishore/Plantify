export const load = async ({fetch, params}:any) => {
    let questionID:string = params.id;

    const response = await fetch('/api/QuestionAnswer/SearchQuestionByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: questionID})
    });
    const data = await response.json();

    return {
        question: JSON.stringify(data)
    }
}