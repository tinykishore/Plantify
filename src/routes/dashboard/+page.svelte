<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {Session} from "../Session";
    import Greetings from "./Greetings.svelte";
</script>

<main>
    <Navbar/>
    <Greetings/>

    <h1>Welcome {Session.getName()}, dashboard</h1>
    <a href="/sell">Buy plant</a>
    <div class="flex flex-col">
        <a href="/share-experience">Share Experiences</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
        <a href="/question-answer">Question Answer</a>
    </div>


    <Footer/>
</main>

