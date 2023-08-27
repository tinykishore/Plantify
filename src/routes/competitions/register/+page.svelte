<script lang="ts">

    import {goto} from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import {Session} from "../../Session";
    import Footer from "$lib/components/Footer.svelte";

    const onButtonClick = () => {
        // get age and location
        // @ts-ignore
        const age = document.getElementById('age')?.value;
        // @ts-ignore
        const location = document.getElementById('location')?.value;

        // send json data to server
        // get real time location name
        const competitor = {
            name: Session.getName(),
            email: Session.getEmail(),
            age: age,
            location: location,
        }

        // send to server
        fetch('/api/competitions/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(competitor)
        }).then(response => {
            if (response.ok) {
                goto('/competitions');
            } else {
                alert('Error: ' + response)
            }
        });

    }
</script>

<Navbar/>
<main class="container mx-auto px-8 md:px-32 pt-12">
    <div class="flex justify-center items-center min-h-screen">
        <div class="max-w-3xl mx-auto p-8 rounded-lg  bg-white">
            <h1 class="text-2xl font-semibold mb-6 text-center">Tree Planting Competition Terms and Conditions</h1>

            <h2 class="text-xl font-semibold mb-4">Eligibility:</h2>
            <p class="mb-2">1.1 The Tree Planting Website Competition ("Competition") is open to individuals and teams
                worldwide, regardless of age or location.</p>
            <p class="mb-4">1.2 Employees, affiliates, and immediate family members of the organizers are not eligible
                to participate.</p>

            <h2 class="text-xl font-semibold mb-4">Entry Submission:</h2>
            <p class="mb-2">2.1 Entries must be submitted through the designated submission form on the official
                competition website.</p>
            <p class="mb-2">2.2 Each participant or team may submit only one entry.</p>
            <p class="mb-4">2.3 Entries must be original and not violate any copyright or intellectual property
                rights.</p>

            <h2 class="text-xl font-semibold mb-4">Content Guidelines:</h2>
            <p class="mb-2">3.1 Entries should focus on promoting tree planting, conservation, and environmental
                awareness.</p>
            <p class="mb-2">3.2 Content submitted must be in English or accompanied by a clear translation.</p>
            <p class="mb-4">3.3 Any offensive, inappropriate, or harmful content will result in immediate
                disqualification.</p>

            <h2 class="text-xl font-semibold mb-4">Ownership and Rights:</h2>
            <p class="mb-2">4.1 Participants retain ownership of their submitted content, but grant the organizers a
                non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute the content for
                promotional purposes related to the Competition.</p>
            <p class="mb-4">4.2 The organizers will not claim ownership of any submitted content beyond the specified
                license.</p>

            <!-- ... Other sections ... -->

            <h2 class="text-xl font-semibold mb-4">Disqualification:</h2>
            <p class="mb-2">9.1 The organizers reserve the right to disqualify any participant or entry that violates
                the terms and conditions or attempts to manipulate the competition.</p>
            <p class="mb-4">9.2 Disqualified participants will forfeit any prizes awarded.</p>

            <h2 class="text-xl font-semibold mb-4">Limitation of Liability:</h2>
            <p class="mb-2">10.1 The organizers are not responsible for any technical issues, lost submissions, or other
                errors that may occur during the competition.</p>
            <p class="mb-4">10.2 Participants agree to indemnify and hold the organizers harmless from any claims
                arising from their participation in the competition.</p>

            <h2 class="text-xl font-semibold mb-4">Changes and Termination:</h2>
            <p class="mb-2">11.1 The organizers reserve the right to modify, suspend, or terminate the competition at
                their discretion.</p>

            <h2 class="text-xl font-semibold mb-4">Governing Law:</h2>
            <p class="mb-2">12.1 These terms and conditions are governed by the laws of [Jurisdiction], and any disputes
                will be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</p>

            <p class="mt-6">By participating in the Tree Planting Website Competition, participants agree to abide by
                these terms and conditions in their entirety.</p>

            <div class="mt-4">
                <p class="text-lg font-bold">{new Date().toLocaleDateString()}</p>
                <p class="text-xl font-semibold">Plantify</p>
                <p class="text-gray-600">info@plantify.com</p>
                <p class="text-blue-500">www.plantify.com</p>
            </div>

        </div>
    </div>

    <div class="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-8">
        <label class="block font-semibold mb-2" for="age">Age</label>
        <input type="number" id="age" name="age"
               class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" min="1"
               max="100">

        <label class="block font-semibold mt-4 mb-2" for="location">Location</label>
        <input type="text" id="location" name="location"
               class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none">

        <button on:click={onButtonClick}
                class="w-full mt-6 bg-green-950 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition duration-300">
            Confirm and Continue
        </button>
    </div>

</main>
<section class="my-20"></section>
<Footer/>