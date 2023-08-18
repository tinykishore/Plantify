<script>
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    import {onMount} from "svelte";

    export let data;
    let parsedData = JSON.parse(data.question);


    onMount(() => {

    });

</script>

<main>
    <Navbar/>

    <h1>Heading</h1>
    <h1 class="text-3xl font-bold">{parsedData.body} </h1>
    <Footer/>

</main>