<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    import {onMount} from "svelte";
    import {Session} from "../../Session";
    import Loader from "../../sign-in/Loader.svelte";
    import ReplyGrid from "./ReplyGrid.svelte";
    import GatewayTimeout from "$lib/components/GatewayTimeout.svelte";

    let status: number = 401;
    export let allReply: any;
    export let data2: any;
    export let data;
    let parsedData = JSON.parse(data.question);
    let answer: string = "";


    onMount(async () => {
        data2 = await fetch('/api/QuestionAnswer/SearchAnswerByParentID', {
            method: 'POST',
            body: JSON.stringify({parentQuestionId: parsedData._id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(data2);
        // If the initial plant list is not null, set the status code to 200 and handle the category
        // because user might have selected a category before the plants were fetched
        if (data2) {
            status = 200;
        } else status = 404;

    });


    const reply = async () => {
        //create an object of type Question
        const answerObj: Answer = {
            _id: "",
            parentQuestionId: parsedData._id,
            name: Session.getName(),
            email: Session.getEmail(),
            body: answer,
        }

        if (!answerObj.body) return alert("Please write something");

        allReply = await fetch('/api/QuestionAnswer/ReplyQuestion', {
            method: 'POST',
            body: JSON.stringify(answerObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // reload the page
        location.reload();
    }


</script>

<main>
    <Navbar/>

    <h1>{parsedData.body}</h1>
    <div class="container mx-auto px-8 md:px-64  pt-12">
        <div class="flex-col flex gap-6 mt-10 justify-end items-end">
            <h1 class="w-full text-center font-extrabold text-3xl">Ask your pro question</h1>
            <textarea rows="5" class="bg-zinc-100 shadow-xl rounded-2xl w-full p-4" placeholder="Write your story here"
                      bind:value={answer}></textarea>
            <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end" on:click={reply}>
                Reply
            </button>
        </div>
    </div>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <ReplyGrid bind:experiences={data2}/>
    {:else}
        <GatewayTimeout/>
    {/if}
    <Footer/>

</main>