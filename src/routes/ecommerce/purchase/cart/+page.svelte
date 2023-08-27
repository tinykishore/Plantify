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
                alert("Purchased Successfully")
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
        console.log(selectedOption);
    });

    const onchange = (event: any) => {
        selectedOption = event.currentTarget.value;
    }

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

            <hr class="mt-6 border-2 rounded-full border-green-950">

            <h1 class="text-end mr-4 text-2xl font-black my-2 text-zinc-700">
                Total: <span class="font-mono text-green-700">{total}</span>
            </h1>
        </div>


        <div>
            <h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Payment Method</h1>
            <ul class="flex flex-col w-full gap-6">
                <li>
                    <input checked={selectedOption === "card"} on:change={onchange} name="payment" type="radio"
                           id="card" class="hidden peer" value="card"
                           required>
                    <label for="card"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
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
                    <input checked={selectedOption === "bkash"} on:change={onchange} type="radio" id="bkash"
                           name="payment" value="bkash" class="hidden peer">
                    <label for="bkash"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
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
                    <input checked={selectedOption === "cod"} on:change={onchange} type="radio" id="cod" name="payment"
                           value="cod" class="hidden peer"
                           required>
                    <label for="cod"
                           class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
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

            {#if selectedOption === 'card'}
                <div class="mt-4 p-2 flex flex-col gap-3">
                    <div class="flex gap-2">
                        <label for="cardNumber">Card Number</label>
                        <input class="border border-green-800 rounded py-2 px-4" type="text" id="cardNumber"
                               bind:value={cardInfo.cardNumber}/>
                    </div>

                    <div class="flex gap-2">
                        <label for="cardName">Card Name</label>
                        <input class="border border-green-800 rounded py-2 px-4" type="text" id="cardName"
                               bind:value={cardInfo.cardName}/>
                    </div>

                    <div class="flex gap-2">
                        <label for="cardExpiry">Card Expiry</label>
                        <input class="border border-green-800 rounded py-2 px-4" type="text" id="cardExpiry"
                               bind:value={cardInfo.cardExpiry}/>
                    </div>

                    <div class="flex gap-2">
                        <label for="cardCvv">Card CVV</label>
                        <input class="border border-green-800 rounded py-2 px-4" type="text" id="cardCvv"
                               bind:value={cardInfo.cardCvv}/>
                    </div>
                </div>

                <button class="bg-green-950 text-white font-black px-4 py-2 rounded-xl" on:click={confirmOrder}>
                    Confirm Order
                </button>
            {/if}

            {#if selectedOption === 'bkash'}
                <div>
                    <label for="trxId">Transaction ID</label>
                    <input type="text" id="trxId" bind:value={bkashInfo.trxId}/>
                </div>

                <button class="bg-green-950 text-white font-black px-4 py-2 rounded-xl" on:click={confirmOrder}>
                    Confirm Order
                </button>
            {/if}


        </div>


    </div>
</main>
<Footer/>