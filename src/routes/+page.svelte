<script>
    import {onMount} from "svelte";
    import Navbar from "$components/Navbar.svelte";
    import Footer from "$components/Footer.svelte";
    import PlantsGrid from "$components/PlantsGrid.svelte";
    import PlantCategory from "../components/PlantCategory.svelte";
    import Loader from "$components/Loader.svelte";
    import GatewayTimeout from "$components/GatewayTimeout.svelte";

    let key = "";
    let category = "";

    let plantList;
    let filteredPlantList;
    let status = 401;

    const handleSearch = () => {
        filteredPlantList = plantList.filter((flower) => {
            return flower.name.toLowerCase().startsWith(key.toLowerCase());
        });
    }

    const handleCategory = () => {
        if (category !== "") {
            filteredPlantList = plantList.filter((flower) => {
                return flower.category.toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = plantList;
        }
    };

    onMount(async () => {
        document.title = "Plantify";
        plantList = await fetch('/api/PlantsCollection').then((response) => {
            if (response.ok) return response.json();

        }).catch((error) => {
            status = 500;
        });
        if (plantList) {
            status = 200;
            filteredPlantList = plantList;
        } else status = 404;

    });

</script>

<main>
    <Navbar bind:searchKey={key} on:searchKeyChange={handleSearch}/>
    <PlantCategory bind:selectedValue={category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <PlantsGrid bind:plantList={filteredPlantList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>
