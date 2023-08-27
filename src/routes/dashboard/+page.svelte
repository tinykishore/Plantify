<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Greetings from "./Greetings.svelte";
    import dashboard_image_one from "$lib/assets/dashboard1.svg";
</script>

<main>
    <Navbar/>
    <Greetings/>
    <section class="container mx-auto px-48 mb-12">
        <div class="grid-cols-2 grid place-items-start p-4 bg-gradient-to-r from-green-50 to-white rounded-2xl">
            <div class="place-self-center">
                <h2 class="text-3xl font-black text-green-900 mb-6">Must-Have Buddy for Garden Lovers and Outdoor
                    Explorers!</h2>
                <p class="text-gray-700">
                    We are passionate about plants and nature. Our platform connects plant enthusiasts, allowing you to
                    buy plants, share your experiences, ask questions, and participate in various competitions related to
                    gardening and plant care. Whether you're a seasoned gardener or just starting, our community
                    welcomes you with open arms.
                </p>
            </div>
            <img src="{dashboard_image_one}" alt="dashboard_image_one" class="place-self-end w-[70%] object-cover"/>
        </div>
    </section>

    <div class="container mx-auto px-40">
        <div class="grid grid-cols-3 gap-y-20 gap-x-6">
            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Get ready to embrace some green goodness! 🌿🛒
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Explore our curated collection of beautiful and diverse plants. Whether you're looking for
                    indoor plants to brighten up your space or outdoor plants to enhance your garden, we have a wide
                    range of options for you to choose from. Each plant comes with detailed care instructions to
                    ensure they thrive in your care.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/ecommerce/purchase">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Purchase Plants Now
            </a>


            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Let me put on my storytelling hat! 🌱🌳
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Connect with fellow plant enthusiasts and share your gardening journey. Share photos of your
                    plants, your successes, and even your challenges. Learn from others, exchange tips and tricks,
                    and become a part of our vibrant community dedicated to fostering a love for plants.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/community/share-experience">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Let Me Share My Experience
            </a>

            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Ready to unravel the mysteries of the plant kingdom? 🌱🔍
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Got questions about plant care, gardening techniques, or specific plant species? Our Question &
                    Answer section is the perfect place to ask. Engage with experienced gardeners and get expert
                    advice to ensure your plants thrive and your gardening endeavors are successful.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/community/share-experience">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Let Me Share My Experience
            </a>

            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Pack your gardening gloves and join the adventure! 🌱🌍
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Embark on a delightful Plantation Journey with us. From planting your first seed to watching it
                    grow into a flourishing plant, we're here to guide you every step of the way. Discover the joy
                    of nurturing life and contributing to the environment through planting and cultivating various
                    plant species.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/community/share-experience">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Let Me Share My Experience
            </a>


            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Calling all green champions to the ultimate plant showdown! 🌿🏆
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Show off your gardening skills and creativity by participating in our exciting plant-themed
                    competitions. From best garden design to unique plant arrangements, our competitions offer a
                    platform for you to showcase your talent, win amazing prizes, and connect with fellow
                    enthusiasts who share your passion.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/community/share-experience">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Let Me Share My Experience
            </a>


            <div class="col-span-2 group">
                <h3 class="text-3xl font-black mb-4 group-hover:text-amber-800 transition-all duration-300">
                    Step into the realm of plant prophecies! 🔮
                </h3>
                <p class="text-gray-700 w-[80%]">
                    Engage in the thrill of predicting plant growth and outcomes. Participate in our prediction
                    challenges where you can use your knowledge and intuition to forecast how certain plants will
                    develop over time. Test your expertise, learn from the results, and enjoy the process of
                    observing the natural world around you.
                </p>
            </div>
            <a class="justify-self-end place-self-center flex items-center
            bg-amber-200 h-fit py-6 w-full px-6 rounded-2xl  text-xl font-bold text-amber-950
            hover:bg-amber-300 hover:text-amber-900 hover:shadow-lg transition duration-300 ease-in-out
            translate-y-5"
               href="/community/share-experience">
                <span class="-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5l7 7-7 7"/>
                    </svg>
                </span>
                Let Me Share My Experience
            </a>


            <a class="bg-blue-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-blue-900"
               href="/community/share-experience">

            </a>
            <a class="bg-green-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-green-900"
               href="/community/question-answer">
                Question & Answer
            </a>
            <a class="bg-purple-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-purple-900"
               href="/plantation-journey">
                Plantation Journey
            </a>
            <a class="bg-yellow-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-yellow-900"
               href="/competitions">
                Competitions
            </a>
            <a class="bg-pink-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-pink-900"
               href="/prediction">
                Predictions
            </a>
        </div>
    </div>

</main>

<section class="my-16">
</section>

<Footer/>

