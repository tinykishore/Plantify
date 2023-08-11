<script lang="ts">
import Navbar from "$lib/components/Navbar.svelte";
import {Session} from "../Session";
import {onMount} from "svelte";
import {json} from "@sveltejs/kit";

let experience: string = "";
export let data;

const submit = async () => {
    //create an object of name, email, experience and likes
    const experienceObj: Experience = {
        name: Session.getName(),
        email: Session.getEmail(),
        experience: experience,
        likes: 0
    }

    const response = await fetch('/api/ShareExperience', {
        method: 'POST',
        body: JSON.stringify(experienceObj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

onMount(async () => {
    data = await fetch('/api/ShareExperience').then((response) => {
        if (response.ok) return response.json();
    });
    console.log(data);
    data = JSON.parse(data);

});
</script>


<main>
    <Navbar />

    <h1>Share your experiences and innovative ideas</h1>
    <textarea rows="4" cols="50" placeholder="Write your story here" bind:value={experience}></textarea>
    <button on:click={submit}>Submit</button>

    <h1>Experiences shared by others</h1>
    <div>
<!--        show the experiences of others-->
        {#each data as experience}
            <div>
                <h3>{experience.name}</h3>
                <p>{experience.experience}</p>
                <p>{experience.likes}</p>
            </div>
        {/each}

    </div>

</main>