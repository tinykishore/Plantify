<script lang="ts">
    import {Session} from "../../Session";
    import {onMount} from "svelte";

    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp', 'heic'];

    export let images: any[] = [];


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
            base64 = reader.result;
            const data = {
                email: Session.getEmail(),
                image: base64,
                description: 'profile picture'
            }

            const response = await fetch('/api/competitions/UploadImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                alert('Image uploaded successfully');
            } else {
                alert('Error uploading image');
            }


        };


    }

    onMount(async () => {
        const response = await fetch('/api/competitions/GetAllImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Session.getEmail()})
        });
        images = await response.json();
    });

</script>


<form on:submit={onSubmitClick}>
    <div class="group">
        <label for="file">Upload your profile picture</label>
        <input accept={authorizedExtensions.join(',')} id="file" name="fileToUpload" required type="file"/>
    </div>
    <button type="submit">Upload</button>
</form>


<div>
    {#each images as image}
        <img src={image.data} alt="demo"/>
        <h1 class="text-sm">{image.description}</h1>
    {/each}
</div>
