<script lang="ts">

    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;
    let images = JSON.parse(data.images);
    let id = data.id;
    let likes: number;
    $: {
        fetch('/api/competitions/GetLikes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: id})
        }).then(res => res.json()).then(data => {
            likes = data
        }).catch(err => console.log(err));
    }

    const clickedLike = () => {
        // Post req to server
        fetch('/api/competitions/IncrementLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: id})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));

        likes++;

    }
</script>

<Navbar/>
<main class="container mx-auto px-12 md:px-52">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">.
        {#if images.data === null}
            <h1 class="text-2xl text-center">No images found</h1>
        {/if}
        {#each images as image}
            <div class="border rounded-lg overflow-hidden shadow-md">
                <img src={image.data} alt="demo" class="w-full h-auto">
                <div class="p-4">
                    <h1 class="text-sm mb-2">{image.description}</h1>
                    <p class="text-gray-600 text-xs mb-4">Posted by: {image.author}</p>
                    <div class="flex items-center justify-between">
                        <button on:click={clickedLike}
                                class="flex items-center text-blue-500 hover:text-blue-600 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Like
                        </button>
                        <div class="flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M5 15l7-7 7 7"/>
                            </svg>
                            {image.likes}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>
<Footer/>

