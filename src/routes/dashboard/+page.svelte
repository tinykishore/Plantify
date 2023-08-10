<script lang="ts">
    import {onMount} from "svelte";
    import {authenticatedUser} from "../../stores.js";
    import {redirect} from "@sveltejs/kit";
    import Navbar from "$components/Navbar.svelte";

    let loggedIn: any;

    onMount(async () => {
        const token = document.cookie.split("=")[1];
        loggedIn = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).catch(() => {
            return false;
        });

        console.log(loggedIn);

        if (!loggedIn) {
            redirect(301, '/login')
        } else {
            authenticatedUser.set({
                name: loggedIn.name,
                email: loggedIn.email,
                token: token
            });
        }

    });
</script>

<main>
    <Navbar/>
    <h1>
        Welcome {loggedIn.name}
    </h1>
</main>
