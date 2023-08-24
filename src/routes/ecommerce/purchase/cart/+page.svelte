<script lang="ts">
    import {cartArray} from "../../../../stores.js";

    let localCartArray: any = [];

    cartArray.subscribe((value) => {
        localCartArray = value;
    });

    const onRemoveClick = (e: any) => {
        for (let i = 0; i < localCartArray.length; i++) {
            if (localCartArray[i].name === e.target.parentElement.children[0].innerText) {
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

    let selectedOption = "card";

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

</script>

<main>
    {#each localCartArray as item}
        <div class="rounded-xl hover:drop-shadow-xl group w-full transition-all duration-300 ease-in-out flex flex-col items-center align-middle justify-between">
            <div class="px-4 py-2">
                <h1 class="custom-transition font-black text-xl text-center group-hover:text-teal-700">{item.name}</h1>
                <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.price}</h1>
                <h1 class="font-thin text-xs text-zinc-400 group-hover:text-zinc-600">{item.quantity}</h1>
                <button on:click={onRemoveClick} class="bg-gray-400 p-1 rounded-lg"> Remove</button>
            </div>
        </div>
    {/each}

    <h1 class="text-center text-2xl font-black mt-12">
        Total: {localCartArray.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}
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

</main>