<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    export let data;
    let parsedData = JSON.parse(data.journey);
    let id = data.id;

    const createGoal = () => {

    }

</script>

<Navbar/>
<main class="container mx-auto px-12 md:px-36">
    <h1>Create goal</h1>

    <input type="text" placeholder="Create a goal" class="border-2 border-gray-300 rounded-md p-2 w-full mb-4">
    <button class="bg-blue-500 text-white rounded-md p-2" on:click={createGoal}>Create</button>


    <div class="grid grid-cols-2 place-items-center">
        <div>
            <h2 class="w-full text-center text-2xl font-bold">Current goal</h2>

            <div>
                // list
            </div>
        </div>

        <div>
            <h2 class="w-full text-center text-2xl font-bold">Completed goal</h2>
            <div>
                // list
            </div>
        </div>

    </div>
</main>