<script>
    import {Session} from "../Session";
    import dashboard_welcome from "$lib/assets/dashboard-welcome.svg";
</script>

<main class="bg-gradient-to-b from-green-100 via-green-50 to-white">
    <div class="g-green-800 b container mx-auto px-8 md:px-32 pt-12">
        <div class="flex gap-4 justify-between mt-4">
            <div class="flex flex-col w-full justify-end">
                <h1 class="text-6xl font-black text-[#453c30]">
                    Hi there!
                </h1>
                <svg>
                    <text x="0%" y="0%" dy="5rem" text-anchor="start">
                        {Session.getName()}
                    </text>
                </svg>
            </div>
            <img class="w-[450px]" src="{dashboard_welcome}" alt="">
        </div>

        <h1 class="animate-fadeIn transition-all duration-700 text-center text-6xl text-green-950 font-black mt-20">
            Welcome to the world of plants
        </h1>
    </div>
</main>



<style>
    main {
        min-height: 80vh;
    }

    svg text {
        animation: stroke 3s forwards;
        stroke-width: 2;
        stroke: #54A262;
        font-size: 3.75rem;
        font-weight: bold;
    }

    @keyframes stroke {
        0% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            stroke-width: 2;
        }
        70% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
        }
        80% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-width: 3;
        }
        100% {
            fill: rgba(84, 162, 98, 1);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            stroke-width: 0;
        }
    }

</style>