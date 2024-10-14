<script setup>
import {useRouter} from 'vue-router';
import kniight_logo from '@/assets/img/kniights.png';

const router = useRouter()

const goBackButton = () => {
    router.push('/')
}

</script>

<template>
<div class="flex items-center justify-center" :style="{ minHeight: 'calc(100vh - 81px)' }">
  <div class="bg-gray-200 p-8 rounded-md shadow-lg">
    <img class="h-100 w-auto mx-auto mb-4" :src="kniight_logo" alt="Nahmii internal testnet logo" />
    <p class="my-2 p-2 font-bold">The page you are looking for does not exist!</p>
    <button @click="goBackButton" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Go Home</button>
  </div>
</div>
</template>