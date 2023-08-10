<script lang="ts">
    import {onMount} from "svelte";
    import {authenticatedUser} from "../stores";

    import Navbar from "$components/Navbar.svelte";
    import Footer from "$components/Footer.svelte";
    import GatewayTimeout from "$components/GatewayTimeout.svelte";

    import PlantsGrid from "./PlantsGrid.svelte";
    import PlantCategory from "./PlantCategory.svelte";
    import Loader from "./Loader.svelte";

    const session: UserSession = {
        email: "null",
        token: "null",
        name: "null",
    }

    authenticatedUser.subscribe((value) => {
        session.email = value.email;
        session.token = value.token;
        session.name = value.name;
    });

    // Search key and category key
    let searchKey: string = "";
    let category: string = "";

    // Plant list
    // Initial plant list is the list of plants fetched from the server
    // Filtered plant list is the list of plants filtered by category
    // Final plant list is the list of plants filtered by category and search key
    let initialPlantList: any;
    let filteredPlantList: any;
    let finalPlantList: any;

    // Status code for loading and error
    let status: number = 401;

    // Fetch the list of plants from the server (GET request)
    onMount(async () => {
        const token = document.cookie.split("=")[1];
        const loggedIn = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
        }).then((response) => {
            if (response.ok) return response.json();
        }).catch(() => {
            status = 500;
        });
        if(loggedIn){
            const name = loggedIn.firstName + " " + loggedIn.lastName;
            authenticatedUser.set({
                email: loggedIn.email,
                token: loggedIn.token,
                name: name,
            });
        }

        // Set the title of the page
        document.title = "Plantify";

        // Fetch the list of plants from the server and store it in the initial plant list
        initialPlantList = await fetch('/api/PlantsCollection').then((response) => {
            if (response.ok) return response.json();
            else return null;
        }).catch(() => {
            status = 500;
        });

        // If the initial plant list is not null, set the status code to 200 and handle the category
        // because user might have selected a category before the plants were fetched
        if (initialPlantList) {
            status = 200;
            handleCategory();
        } else status = 404;
    });

    // Handle the category
    const handleCategory = () => {
        // If the category is not empty, filter the initial plant list by category
        // Else set the filtered plant list to the initial plant list
        if (category !== "") {
            filteredPlantList = initialPlantList.filter((flower: any) => {
                return flower["category"].toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = initialPlantList;
        }
        // Call the handle search function because the category might have changed before the search key
        handleSearch();
    };

    // Handle the search key
    const handleSearch = () => {
        // If the search key is empty, set the final plant list to the filtered plant list
        // Else filter the filtered plant list by search key
        if (searchKey === "") {
            finalPlantList = filteredPlantList;
        } else {
            finalPlantList = filteredPlantList.filter((flower: any) => {
                return flower.name.toLowerCase().startsWith(searchKey.toLowerCase());
            });
        }
    }

</script>

<main>
    <Navbar bind:searchKey={searchKey} on:searchKeyChange={handleSearch}/>

    <PlantCategory bind:selectedValue={category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <a href="/ecommerce" class="btn btn-primary">Add Plant</a>
        <PlantsGrid bind:plantList={finalPlantList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>

