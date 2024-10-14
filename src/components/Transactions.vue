<script setup>
import { reactive, onMounted} from 'vue'
import axios from 'axios'
import Transaction from '@/components/Transaction.vue'

defineProps({
    limit: Number
})

const state = reactive({
    transactions: [],
    isLoading: true,
});

onMounted(async () => {
    try {
        const response = await axios.get('/api/transactions?filter=validated')
        state.transactions = response.data.items
    } catch (error) {
        console.error('Error fetching transaction data', error)
    } finally {
        state.isLoading = false
    }
})

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Transactions
            </h2>
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                Loading
            </div>
            <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-[400px]">
                <Transaction
                  v-for="transaction in state.transactions.slice(0, limit || state.transactions.length)"
                  :key="transaction.block"
                  :transaction="transaction"
                />
            </div>
        </div>
    </section>
</template>