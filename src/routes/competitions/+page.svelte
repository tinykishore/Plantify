<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import {onMount} from "svelte";
    import {Session} from "../Session";
    import Footer from "$lib/components/Footer.svelte";

    export let data: any;
    export let isParticipant: boolean | null = null;

    onMount(async () => {
        let response = await fetch("/api/competitions/GetAllParticipants");
        data = await response.json();

        response = await fetch('/api/competitions/IsParticipated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Session.getEmail()})
        });

        isParticipant = response.status === 200;
    });

    data = JSON.stringify(data);

</script>

<Navbar/>
<main class="container mx-auto px-8 md:px-32 pt-12">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    {#if isParticipant}
        <h1 class="text-xl font-bold mb-6">You are participating in a competition!
        </h1>
        <a href="/competitions/your-participation/" class="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-bold mb-4">Add Info</a>
    {:else}
        <a href="/competitions/register" class="inline-block bg-blue-500 text-white px-4 py-2 rounded-md font-bold mb-4">Register for a Competition</a>
    {/if}
    <div class="flex gap-2 items-center mb-8">
        <hr class="w-full border-2 rounded-full border-zinc-700 ">
        <h2 class="text-xl translate-y-2 font-bold mb-4 text-center">Participants</h2>
        <hr class="w-full border-2 rounded-full border-zinc-700">
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data as competitor}
            <a href="/competitions/competitors/{competitor._id}"
               class="shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 bg-green-50">
                <h1 class="text-xl font-bold mb-2">{competitor.name}</h1>
                <h2 class="text-gray-600 text-sm mb-2">{competitor.email}</h2>
                <h3 class="text-green-600 font-bold mb-2">Likes: {competitor.likes}</h3>
                <h3 class="text-gray-600 text-sm mb-2">Joined: {competitor.joined}</h3>
                <h3 class="text-gray-600 text-sm mb-2">Location: {competitor.location}</h3>
                <h3 class="text-blue-600 font-bold">Trees Planted: {competitor.trees_planted}</h3>
            </a>
        {/each}
    </div>
</main>
<section class="my-16">

</section>

<Footer/>
