<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import image from "$lib/assets/identification.svg";
    import Footer from "$lib/components/Footer.svelte";

    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp', 'heic'];

    let requestSent: number = 0;

    let prediction: any = null;

    const onSubmitClick = (event: Event) => {
        // Fetch the file input
        const fileInput = document.getElementById('file') as HTMLInputElement;

        // Get the file extension
        const fileExtension = fileInput.value.substring(fileInput.value.lastIndexOf('.'));

        // Check if the file extension is authorized
        if (!authorizedExtensions.includes(fileExtension)) {
            event.preventDefault();
            alert('File extension not authorized');
        }

        // Convert the file to base64
        // @ts-ignore
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let base64: string | ArrayBuffer | null = null;
        reader.onload = async () => {
            requestSent = 1;
            base64 = reader.result;
            const data = {
                image: base64,
            }

            console.log(data);

            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            requestSent = 0;

            prediction = json.predicted_plant_name;
        };
    }

</script>

<Navbar/>
<main class="container mx-auto px-52">
    <h1 class="text-4xl font-black text-green-600 mt-24 my-6 flex items-center">
        Now we can recognize plants for you!
        <span class="inline-block ml-4 px-2 py-1 text-white text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
            Beta
        </span>
    </h1>
    <div class="grid grid-cols-2 gap-12 place-items-start w-full">
        <form class="w-full flex flex-col justify-around pt-10" on:submit={onSubmitClick}>
            <h1 class="mt-4 text-xl font-semibold text-zinc-500 pb-8">Upload an image of a plant, and our system will
                predict its
                species based on
                the picture
            </h1>
            <div class="mb-4">
                <label for="file" class="block text-gray-700 font-bold mb-2">Upload your profile picture</label>
                <input accept={authorizedExtensions.join(',')} id="file" name="fileToUpload" required type="file"
                       class="w-full border rounded py-2 px-3 bg-gray-100">
            </div>
            <button type="submit" class="bg-green-900 rounded-xl font-black text-white py-2 px-4 ">
                <svg class="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Upload
            </button>

            {#if (requestSent === 1)}
                <div class="mt-12 flex flex-col gap-4">
                    <div class="rounded-xl select-none w-full animate-pulse">
                        <div class="px-4 py-2">
                            <div class="mt-3 h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full max-w-[410px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                    </div>
                </div>
            {/if}

            <div class="mt-12 flex flex-col gap-4">
                {#if prediction !== "background" && prediction !== null}
                    <h1 class="font-semibold text-zinc-600"> We identified this plant as</h1>
                    <div class="bg-green-100 border border-green-400 font-black text-xl text-green-700 px-4 py-3 rounded-xl"
                         role="alert">
                        <span>{prediction}</span>
                    </div>
                {:else if prediction === "background"}
                    <h1 class="font-semibold text-red-700">Sorry! we cannot identify this plant...</h1>
                    <h1 class="font-semibold text-zinc-600">Possible Scenarios:</h1>
                    <ul class="list-disc list-inside text-zinc-500">
                        <li>Plant is not in our database</li>
                        <li>Picture is not clear enough</li>
                        <li>Picture is not of a plant</li>
                    </ul>
                {:else if prediction === null}
                    <div>
                    </div>
                {/if}
            </div>
        </form>

        <div class="w-full place-self-start">
            <img src="{image}" alt="Identification" class="w-[34rem]">

        </div>
    </div>
</main>
<Footer/>