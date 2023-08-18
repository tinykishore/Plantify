<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {Session} from "../Session.js";
    import {onMount} from "svelte";
    import Loader from "../share-experience/Loader.svelte";
    import ExperienceGrid from "../share-experience/ExperienceGrid.svelte";
    import GatewayTimeout from "$lib/components/GatewayTimeout.svelte";
    import QuestionAnswerGrid from "./QuestionAnswerGrid.svelte";

    let status: number = 401;
    let question: string;

    export let data: any;

    onMount(async () => {
        data = await fetch('/api/QuestionAnswer').then((response) => {
            if (response.ok) return response.json();
            else return null;
        }).catch(() => {
            status = 500;
        });

        // If the initial plant list is not null, set the status code to 200 and handle the category
        // because user might have selected a category before the plants were fetched
        if (data) {
            status = 200;
        } else status = 404;

        // sort the data by likes
        data.sort((a: any, b: any) => {
            return b.likes - a.likes;
        });

    });


    const submit = async () => {
        //create an object of type Question
        const questionObj: Question = {
            _id: "",
            name: Session.getName(),
            email: Session.getEmail(),
            body: question,
        }

        if (!questionObj.body) return alert("Please write something");

        data = await fetch('/api/QuestionAnswer/AskQuestion', {
            method: 'POST',
            body: JSON.stringify(questionObj),
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

    <div class="container mx-auto px-8 md:px-64  pt-12">
        <div class="flex-col flex gap-6 mt-10 justify-end items-end">
            <h1 class="w-full text-center font-extrabold text-3xl">Ask your pro question</h1>
            <textarea rows="5" class="bg-zinc-100 shadow-xl rounded-2xl w-full p-4" placeholder="Write your story here"
                      bind:value={question}></textarea>
            <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end" on:click={submit}>
                Submit
            </button>
        </div>
    </div>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <QuestionAnswerGrid bind:experiences={data}/>
    {:else}
        <GatewayTimeout/>
    {/if}


    <Footer/>

</main>