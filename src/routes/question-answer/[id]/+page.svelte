<script lang="ts">
    import {onMount} from "svelte";
    import {Session} from "../../Session";
    import Navbar from "$lib/components/Navbar.svelte";
    import question_answer from '$lib/assets/question-answer.svg';


    let status: number = 401;
    export let allReply: any;
    export let data2: any;
    export let data;
    let parsedData = JSON.parse(data.question);
    let answer: string = "";


    onMount(async () => {
        data2 = await fetch('/api/QuestionAnswer/SearchAnswerByParentID', {
            method: 'POST',
            body: JSON.stringify({parentQuestionId: parsedData._id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(data2);
        // If the initial plant list is not null, set the status code to 200 and handle the category
        // because user might have selected a category before the plants were fetched
        if (data2) {
            status = 200;
        } else status = 404;
    });


    const reply = async () => {
        //create an object of type Question
        const answerObj: Answer = {
            _id: "",
            parentQuestionId: parsedData._id,
            name: Session.getName(),
            email: Session.getEmail(),
            body: answer,
        }

        if (!answerObj.body) return alert("Please write something");

        allReply = await fetch('/api/QuestionAnswer/ReplyQuestion', {
            method: 'POST',
            body: JSON.stringify(answerObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // reload the page
        location.reload();
    }


</script>

<main>
    <Navbar/>

    <div class="container mx-auto px-8 md:px-32 pt-12">

        <div class="flex flex-col gap-2">
            <img/>
            <h1>{data.question}</h1>
        </div>

        <div class="grid grid-cols-2 place-items-start gap-x-4">
            <img src="{question_answer}" alt="">
            <div class="p-2 flex flex-col gap-3 w-full">
                <h1 class="text-3xl font-bold pt-8 pb-2 text-amber-600">Ask a Question... <br>Get Expert Answers!</h1>
                <textarea
                        class="px-4 py-4 shadow-xl rounded-2xl w-full mb-8 mt-4 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        placeholder="Write your questions here..."></textarea>

                <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end">
                    <span class="flex gap-2 items-center align-middle justify-center">
                        <span>Ask to the community</span>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18"
                             viewBox="0,0,256,256"
                             style="fill:#fff;">
                            <g fill="#fff" fill-rule="nonzero" stroke="none" stroke-width="1"
                               stroke-linecap="butt" stroke-linejoin="miter"
                               stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                               font-family="none" font-weight="none"
                               font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <g transform="scale(8.53333,8.53333)"><path
                                    d="M5,3c-0.55228,0 -1,0.44772 -1,1c0.00021,0.09046 0.01269,0.18047 0.03711,0.26758c0.00065,0.00196 0.0013,0.00391 0.00195,0.00586l0.96094,6.72656l-3,2l21,2l-21,2l3,2l-0.96094,6.72852c-0.02543,0.08827 -0.03857,0.17962 -0.03906,0.27148c0,0.55228 0.44772,1 1,1c0.13295,-0.00072 0.26442,-0.02794 0.38672,-0.08008l0.00195,0.00195l0.04297,-0.02148l0.02148,-0.00977c0.00589,-0.0032 0.01175,-0.00645 0.01758,-0.00977l21.91992,-10.95898l0.00195,-0.00391c0.36782,-0.157 0.60672,-0.51805 0.60742,-0.91797c-0.00025,-0.4011 -0.24014,-0.76324 -0.60937,-0.91992c0,-0.00065 0,-0.0013 0,-0.00195h-0.00195l-21.91016,-10.95508c-0.02918,-0.01647 -0.05916,-0.03146 -0.08984,-0.04492c-0.12305,-0.05172 -0.2552,-0.07828 -0.38867,-0.07812z"></path></g></g></svg>
                    </span>
                </button>
            </div>
        </div>
    </div>

        <div class="container mx-auto px-8 md:px-64  pt-12">
            <div class="flex-col flex gap-6 mt-10 justify-end items-end">
                <h1 class="w-full text-center font-extrabold text-3xl">Ask your pro question</h1>
                <textarea rows="5" class="bg-zinc-100 shadow-xl rounded-2xl w-full p-4"
                          placeholder="Write your story here"
                          bind:value={answer}></textarea>
                <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end"
                        on:click={reply}>
                    Reply
                </button>
            </div>
        </div>

        <!--{#if status === 401}-->
        <!--    <Loader/>-->
        <!--{:else if status === 200}-->
        <!--    <ReplyGrid bind:experiences={data2}/>-->
        <!--{:else}-->
        <!--    <GatewayTimeout/>-->
        <!--{/if}-->
        <!--<Footer/>-->

</main>