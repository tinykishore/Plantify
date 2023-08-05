<script lang="ts">
    import {onMount} from "svelte";

    export let data;
    let parsedData = JSON.parse(data.plant);

    onMount(() => {
        document.title = "Plantify - " + parsedData.name;
    });

</script>

<p>{parsedData.name}</p>
<p>{parsedData.species}</p>
<p>{parsedData.family}</p>
<p>{parsedData.origin}</p>
<p>{parsedData.description}</p>
<p>{parsedData.careInstructions}</p>
<p>{parsedData.averageHeight}</p>
<p>{parsedData.sunlightRequirements}</p>
<p>{parsedData.wateringNeeds}</p>
<p>{parsedData.soilTypePreferences}</p>
<p>{parsedData.growthHabit}</p>
<p>{parsedData.leafShape}</p>
<p>{parsedData.foliageTexture}</p>
<p>{parsedData.bloomSeason}</p>
<p>{parsedData.pollinationMethod}</p>
<p>{parsedData.fruitType}</p>
<p>{parsedData.edibleParts}</p>
<p>{parsedData.medicinalProperties}</p>
<p>{parsedData.fragrance}</p>
<p>{parsedData.temperatureTolerance}</p>
<p>{parsedData.hardinessZone}</p>
<p>{parsedData.growthRate}</p>
<p>{parsedData.propagationMethods}</p>
<p>{parsedData.pestsAndDiseases}</p>
<p>{parsedData.lifespan}</p>
<p>{parsedData.droughtTolerance}</p>
<p>{parsedData.humidityRequirements}</p>
<p>{parsedData.pHPreferences}</p>
<p>{parsedData.nutrientRequirements}</p>
<p>{parsedData.pruningNeeds}</p>
<p>{parsedData.toxicity}</p>
<p>{parsedData.wildlifeAttractant}</p>
<p>{parsedData.companionPlantingRecommendations}</p>
<p>{parsedData.winterHardiness}</p>
<p>{parsedData.rootSystemType}</p>
<p>{parsedData.propagationDifficultyLevel}</p>
<p>{parsedData.preferredContainerSize}</p>
<p>{parsedData.fallColor}</p>
<p>{parsedData.specialFeatures}</p>
<p>{parsedData.imageURL}</p>
<p>{parsedData.category}</p>




