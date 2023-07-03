<script lang="ts">
    import {onMount} from "svelte";
    import sign_in_card from "$lib/assets/sign_in_card.svg";
    import logo from "$lib/assets/plantify.svg";

    // Define the credentials object with type and default values
    const credentials: Credentials = {
        email: '',
        password: ''
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/LoginAuthentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                alert('Authentication successful')
            } else {
                document.getElementById('email').classList.add('border-red-400');
                document.getElementById('password').classList.add('border-red-400');
                document.getElementById('password').nextElementSibling.classList.remove('invisible');
            }
        } catch (error) {
            // Handle network or server error
            console.error('Error:', error);
        }
    };

    onMount(() => {
        document.title = "Login | Plantify";
    });

    const validateEmail = (event) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email !== '') {
            event.target.classList.add('border-red-400');
            event.target.nextElementSibling.classList.remove('invisible');
        } else {
            event.target.classList.remove('border-red-400');
            event.target.nextElementSibling.classList.add('invisible');
        }
    };

    const onPasswordInput = (event) => {
        event.target.classList.remove('border-red-400');
    }

</script>

<main class="flex items-center justify-center h-screen">
    <div class="mx-auto w-fit grid grid-cols-2 justify-between rounded-2xl
    bg-opacity-60 backdrop-blur-md shadow-2xl overflow-y-auto">
        <div class="flex-col flex w-full p-12 gap-4">
            <a href="/" class="w-fit"><img src="{logo}" alt="" class="w-32"></a>
            <p class=" select-none text-base font-bold bg-gradient-to-l from-0% from-teal-600 to-green-600 bg-clip-text text-transparent">
                Sow the Future, Plantify Today: Growing a Green Legacy
            </p>
            <img src={sign_in_card} alt="logo" class="w-full">
            <p class="text-xs font-light text-teal-800 text-end">
                2023 &copy; Plantify. All rights reserved.
            </p>
        </div>
        <div class="p-12 bg-white flex flex-col align-middle justify-center bg-opacity-70 place-self-center w-full h-full">
            <h1 class="text-3xl font-bold text-teal-800 text-center">Sign in to your account</h1>

            <div id="loginWithAPIs" class="flex gap-4 my-8 justify-center">
                <button class="bg-blue-600 text-white font-black hover:bg-blue-800 hover:shadow-md outline-none
                        rounded-full w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                    <span class="ml-2">Sign in with Google</span>
                </button>
                <button class="bg-zinc-800 text-white font-black hover:bg-zinc-900 hover:shadow-md outline-none
                        rounded-full w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                    <span class="ml-2">Sign in with Apple</span>
                </button>
            </div>
            <h1 class="text-xs text-zinc-400 text-center">OR</h1>
            <form class="mt-5 align-middle flex flex-col" on:submit|preventDefault="{handleSubmit}">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                <input type="text" bind:value="{credentials['email']}" id="email"
                       class="bg-gray-50 border font-mono border-gray-300 text-gray-900 text-sm rounded-lg outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased"
                       placeholder="your_email@example.com" required on:input={validateEmail}>
                <h1 class="mt-2 invisible w-full text-center text-xs font-semibold text-red-400">
                    Invalid Email Address
                </h1>


                <label for="password" class=" block mb-2 text-sm font-medium text-gray-900">Your
                    password</label>
                <input type="password" id="password" bind:value="{credentials['password']}"
                       class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none
                       focus:shadow-md block w-full p-2.5 transition-all duration-300 antialiased"
                       required on:input={onPasswordInput}>

                <h1 class="mt-2 invisible w-full text-center text-xs font-semibold text-red-400 ">
                    Invalid Credentials
                </h1>

                <div class="flex justify-between align-middle items-center">
                    <a href="/forgot-password" class=" w-fit text-sm font-bold text-teal-800 text-end">Forgot your
                        password?
                    </a>
                    <button type="submit" id="submit"
                            class="place-self-center bg-emerald-600 text-white font-black hover:bg-emerald-800 hover:shadow-md outline-none
                        rounded-lg w-fit text-sm px-10 py-3 text-center transition-all duration-300 antialiased">
                        Submit
                    </button>
                </div>

                <div class="pt-8 flex flex-col gap-1 justify-center align-middle">
                        <h1 class="">Don't have an account?</h1>
                        <a href="/sign-up" class="w-fit text-base font-semibold text-teal-800 hover:underline">Register
                            here</a>
                    </div>
            </form>
        </div>
    </div>
</main>

<style>
    main {
        background-image: url('/src/lib/assets/sign_in_background.jpg');
        background-size: cover;
        background-position: center;
    }
</style>