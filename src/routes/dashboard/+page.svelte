<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Greetings from "./Greetings.svelte";
</script>

<main>
    <Navbar/>
    <Greetings/>

    <div class="g-green-800 container mx-auto px-12 md:px-36">
        <div class="grid grid-cols-4 place-items-center">
            <a class="bg-amber-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-amber-950" href="/sell">
                Buy plant
            </a>

            <a href="/share-experience">Share Experiences</a>
            <a href="/question-answer">Question Answer</a>
            <a href="/question-answer">Question Answer</a>
        </div>
    </div>

    <section class="my-16"></section>

    <Footer/>
</main>

