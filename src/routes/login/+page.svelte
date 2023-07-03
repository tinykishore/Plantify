<script>
    import Navbar from "$components/Navbar.svelte";

    let username = '';
    let password = '';
    const handleSubmit = async () => {
        const auth = {username, password};

        try {
            const response = await fetch('/api/LoginAuthentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(auth)
            });

            if (response.ok) {
                // Redirect to the dashboard
                // Code here ...
                alert('Authentication successful')
            } else {
                alert('Authentication failed')
            }
        } catch (error) {
            // Handle network or server error
            console.error('Error:', error);
        }


    };
</script>
<Navbar/>
<main class="container mx-auto px-24 md:px-36 py-8">
    <form on:submit|preventDefault="{handleSubmit}">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
            <input type="text" bind:value="{username}" id="email"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                   placeholder="username" required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your
                password</label>
            <input type="password" id="password" bind:value="{password}"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   required>
        </div>
        <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit
        </button>
    </form>
</main>