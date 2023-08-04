<script lang="ts">
    import {onMount} from "svelte";
    import Navbar from "$components/Navbar.svelte";
    import Footer from "$components/Footer.svelte";
    import Loader from "../Loader.svelte";
    import GatewayTimeout from "$components/GatewayTimeout.svelte";
    import SellCatagory from "./SellCatagory.svelte";
    import SellGrid from "./SellGrid.svelte";

    let key = "";
    let category = "";

    let plantList;
    let filteredPlantList;
    let status = 401;

    const handleSearch = () => {
        console.log(key);
        filteredPlantList = plantList.filter((i) => {
            return i.product_name.toLowerCase().startsWith(key.toLowerCase()) || i.category.toLowerCase().includes(key.toLowerCase())
        });
    }

    const handleCategory = () => {
        if (category !== "") {
            filteredPlantList = plantList.filter((flower) => {
                // FIXME: Previously: flower.category.toLowerCase().startsWith(category.toLowerCase());
                return flower["category"].toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = plantList;
        }
    };

    onMount(async () => {
        document.title = "Plantify";
        plantList = await fetch('/api/SellCollection').then((response) => {
            if (response.ok) return response.json();

        }).catch(() => {
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

    <SellCatagory bind:selectedValue = {category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <SellGrid bind:sellList={filteredPlantList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>
