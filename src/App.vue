<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <AnalysisForm @submit="onSubmit" @reset="onReset" @error="onError" />
        <ResultsTable class="mt-4" :results="results" />
        <error-message v-if="errorMessage" :message="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import AnalysisForm from './components/AnalysisForm.vue'
import ResultsTable from './components/ResultsTable.vue'
import ErrorMessage from './components/ErrorMessage.vue'

export default {
  components: {
    AnalysisForm,
    ResultsTable,
    ErrorMessage
  },
  data() {
    // In a real-world application, the results would be in a store rather than in the App component
    return {
      results: null,
      errorMessage: null
    }
  },
  methods: {
    onSubmit(results) {
      this.results = results
    },
    onReset() {
      this.errorMessage = null
      this.results = null
    },
    onError(errorMessage) {
      this.errorMessage = errorMessage
      this.results = null
    }
  }
}
</script>