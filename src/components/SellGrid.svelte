<script lang="ts">
    export let sellList;
    // import plant_not_found from '$lib/assets/plant_not_found.svg';
</script>

<main class="container mx-auto px-8 md:px-12 pb-20 pt-12">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-6 lg:grid-cols-4 mt-4">
        {#if sellList.length === 0}
            <div class="flex flex-col justify-center align-middle items-center col-span-full row-span-full w-full mx-auto h-full">
<!--                <img class=" h-[28rem] object-contain" src="{plant_not_found}" alt=""/>-->
                <h1 class="text-2xl font-black text-center">No Items found</h1>
            </div>
        {:else}
            {#each sellList as item}
                <a class="rounded-xl hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out"
                   href="/plants/{item.name}">
                    <img class="rounded-xl h-44 object-cover w-full" src="{item.imageURL}" alt=""/>
                    <div class="px-4 py-2">
                        <h1 class="custom-transition font-black text-xl text-center group-hover:text-teal-700">{item.name}</h1>
                        <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.price}</h1>
                        <button class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full w-full mt-2">
                            Buy
                        </button>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</main>



