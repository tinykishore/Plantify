<script lang="ts">
    import {cartArray} from "../../../../stores.js";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {beforeUpdate} from "svelte";

    let localCartArray: any = [];

    cartArray.subscribe((value) => {
        localCartArray = value;
    });

    const onRemoveClick = (e: any) => {
        console.log(e.target.parentElement.children[0].innerText);
        for (let i = 0; i < localCartArray.length; i++) {
            if (localCartArray[i].name === e.target.parentElement.previousElementSibling.children[0].innerText) {
                if (localCartArray[i].quantity > 1) {
                    localCartArray[i].quantity--;
                } else {
                    localCartArray.splice(i, 1);
                }
                cartArray.set(localCartArray);
            }
        }
    }

    const confirmOrder = () => {
        fetch("/api/ecommerce/ProcessOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localCartArray)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                cartArray.set([]);
            }).catch((err) => console.log(err));
    }

    let selectedOption = "";

    const options = [
        {value: "card", label: "Card"},
        {value: "bkash", label: "BKash"},
        {value: "cod", label: "Cash on Delivery"}
    ];

    let cardInfo = {
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvv: ""
    };
    let bkashInfo = {trxId: ""};

    let total = 0;

    $: {
        total = localCartArray.reduce((acc: any, curr: any) => acc + (curr.price * curr.quantity), 0);
        total = Math.round(total * 100) / 100;

    }

    beforeUpdate(() => {
       console.log(localCartArray);
    });

</script>


<Navbar/>
<main class="container mx-auto px-8 md:px-32 pb-20 pt-12">
    <div class="grid grid-cols-2 gap-8">
        <div>
            <h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Added Items</h1>
            <div class="flex flex-col gap-4">
                {#each localCartArray as item}
                    <div class="px-4 py-2 w-full bg-emerald-100 rounded-xl flex justify-between items-center">
                        <div>
                            <h1 class="font-black text-2xl text-emerald-900">{item.name}</h1>
                            <h1 class="font-bold text-zinc-400 group-hover:text-zinc-600">Per item $ {item.price}</h1>
                        </div>

                        <div class="flex gap-6 items-center">
                            <h1 class="font-bold text-green-800/80 group-hover:text-zinc-600">
                                &times; {item.quantity}</h1>
                            <button on:click={onRemoveClick} class="bg-gray-400 px-4 py-2 rounded-lg text-white">
                                Remove
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div>
            <ul class="flex flex-col w-full gap-6">
                <li>
                    <input bind:value={selectedOption} name="payment" type="radio" id="card"  class="hidden peer"
                           required>
                    <label for="card"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-full">Card Payment</div>
                        </div>
                        <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
                <li>
                    <input type="radio" id="bkash" name="payment" value="hosting-big" class="hidden peer">
                    <label for="bkash"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-full">Bkash</div>
                        </div>
                        <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>

                <li>
                    <input type="radio" id="cod" name="payment" value="hosting-small" class="hidden peer"
                           required>
                    <label for="cod"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-full">Cash on Delivery (COD)</div>
                        </div>
                        <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
            </ul>
        </div>


        <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">How much do you expect to use each
            month?
        </h3>


        <h1 class=" text-2xl font-black my-12">
            Total: {total}
        </h1>


        <select bind:value={selectedOption}>
            {#each options as option (option.value)}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>

        {#if selectedOption === 'card'}
            <div>
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" bind:value={cardInfo.cardNumber}/>
                <label for="cardName">Card Name</label>
                <input type="text" id="cardName" bind:value={cardInfo.cardName}/>
                <label for="cardExpiry">Card Expiry</label>
                <input type="text" id="cardExpiry" bind:value={cardInfo.cardExpiry}/>
                <label for="cardCvv">Card CVV</label>
                <input type="text" id="cardCvv" bind:value={cardInfo.cardCvv}/>

                <!-- Add more input fields for card info if needed -->
            </div>
        {/if}

        {#if selectedOption === 'bkash'}
            <div>
                <label for="trxId">Transaction ID</label>
                <input type="text" id="trxId" bind:value={bkashInfo.trxId}/>
            </div>
        {/if}

        <button class="mt-12 " on:click={confirmOrder}>
            Confirm Order
        </button>
    </div>
</main>
<Footer/>