<script setup>
import { reactive, ref} from 'vue'

const props = defineProps({
    transaction: Object,
})


const calculateGasFee = (gasPrice, gasConsumed) => {
    var gasInWei = gasPrice * gasConsumed;
    var gasInEth = gasInWei / (10 ** 18)
    var gasFee = gasInEth.toFixed(8)
    return gasFee
}

const formatAddress = (addressHash) => {
    var start = addressHash.slice(0, 8)
    var end = addressHash.slice(-6)
    var formattedAddress = `${start}...${end}`
    return formattedAddress
}

const checkTokenTransfer = (propsTransactionTypes) => {
    if (propsTransactionTypes.includes('token_transfer')) {

        return true
    } else {
        return false
    }
}

const formatTime = (timestamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Convert the time to GMT+2 by adjusting the hours
    const gmtPlus2Offset = 2 * 60; // Offset in minutes for GMT+2
    const gmtPlus2Date = new Date(date.getTime() + gmtPlus2Offset * 60 * 1000);

    // Format time in HH:MM:SS
    const hours = String(gmtPlus2Date.getUTCHours()).padStart(2, '0');
    const minutes = String(gmtPlus2Date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(gmtPlus2Date.getUTCSeconds()).padStart(2, '0');

    // Format date in DD:Month:Year
    const day = String(gmtPlus2Date.getUTCDate()).padStart(2, '0');
    const year = gmtPlus2Date.getUTCFullYear();
    const month = String(gmtPlus2Date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1

    // Combine the formatted parts
    return `${hours}:${minutes}:${seconds} (GMT+2) ${day}-${month}-${year}`;
}


</script>

<template>
  <div class="bg-white p-6 rounded-md shadow-lg border border-gray-200">
    <div class="flex justify-between items-center mb-2">
      <!-- Left side: Title and status -->
      <div>
        <h3 class="text-orange-500 font-bold text-lg">{{checkTokenTransfer(props.transaction.tx_types) ? 'Token Transfer' : 'Contract Call'}}</h3>
        <span class="text-green-500">{{ props.transaction.status === 'ok' ? 'Success' : 'Error' }}</span>
      </div>
      <!-- Right side: Tx Hash -->
      <div class="bg-gray-100 text-gray-600 rounded-md px-2 py-1 text-sm">
        {{  props.transaction.method }}
      </div>
    </div>

    <!-- Transaction details -->
    <div class="mb-2">
      <p class="truncate block max-w-full">{{ props.transaction.hash}}</p>
    </div>

    <div class="flex items-center space-x-1 mb-2">
      <p >{{ `${formatAddress(props.transaction.from.hash)}` }}</p>
      <span>→</span>
      <p >{{formatAddress(props.transaction.to.hash)}}</p>
    </div>

    <div class="text-gray-700 mb-2 flex flex-row justify-center items-center space-x-4">
      <p>{{ `${props.transaction.value} Ether `}}</p>
      <p class="text-gray-500 text-sm">{{`${calculateGasFee(props.transaction.gas_price, props.transaction.gas_used)} TX Fee`}}</p>
      <span class="text-gray-500 text-sm">{{ formatTime(props.transaction.timestamp) }}</span>
    </div>
    <div class="flex justify-center items-center">
        <div class="bg-green-500 rounded-lg px-4 py-2 text-white">
            {{`Block Number: ${props.transaction.block} `}}
        </div>
    </div>
    <!-- <div v-if="!checkTokenTransfer(props.transaction.tx_types)">

    </div>
    <div v-else>
    <div class="flex items-center space-x-1 mb-2">
      <a href="#" class="underline text-blue-500">0x842fab-47efee</a>
      <span>→</span>
      <a href="#" class="underline text-blue-500">NiiFi.V1 (0x0b8b6d-384709)</a>
    </div>

    <div class="text-gray-700 mb-6">
      1,395.515 NIIFI
    </div>


    <div class="flex justify-between items-center">
      <a href="#" class="text-blue-500 underline">View More Transfers</a>
    </div>
    </div> -->
  </div>
</template>