<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    export let data;
    let parsedData = JSON.parse(data.journey);

</script>


<Navbar/>

<main class="container mx-auto px-12 md:px-52">
    <h1 class="text-3xl font-bold mt-12">Journey Dashboard</h1>
    <p class="font-light pb-8">
        Create a journey to track your progress and share it with your friends and family.
    </p>

    <a href="/plantation-journey/create" class="bg-emerald-100 rounded-xl px-4 py-2 font-bold ">Create a new Journey</a>

    <h1 class="text-2xl font-black mt-10">Your Journey</h1>
    <div class="mx-32 flex flex-col gap-4 mt-10">
        {#each parsedData as journey}
            <a href="/plantation-journey/{journey._id}"
               class="grid grid-cols-3 drop-shadow px-8 py-4 rounded-2xl bg-emerald-100">

                <div class="place-items-start">
                    <h1 class="font-black text-2xl text-emerald-900">{journey.title}</h1>
                    <p class="font-bold text-zinc-800"> At {journey.location}</p>
                    <p class="font-bold text-emerald-950 text-sm">
                        <span class="text-zinc-500">Planting Site: </span> {journey.planting_sites}</p>
                </div>

                <div class="flex gap-2 w-full place-self-center align-middle items-center justify-center">
                    <hr class="border-2 border-green-950">
                    <p class="font-bold text-zinc-800 text-sm "> At {journey.duration}</p>
                    <hr class="border-2 border-green-950">
                </div>


                <div class="place-self-end">
                    <p class="font-bold text-zinc-800 text-sm text-end"> At {journey.tree_goal}</p>
                    <p class="font-bold text-zinc-800 text-sm text-end"> At {journey.tree_species}</p>
                </div>

            </a>
        {/each}
    </div>


</main>
