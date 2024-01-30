<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <AnalysisForm @submit="onSubmit" @reset="onReset" />
        <ResultsTable :results="results" />
      </div>
    </div>
  </div>
</template>

<script>
import AnalysisForm from './components/AnalysisForm.vue'
import ResultsTable from './components/ResultsTable.vue'

export default {
  components: {
    AnalysisForm,
    ResultsTable
  },
  data() {
    // In a real-world application, the results would be in a store rather than in the App component
    return {
      results: null
    }
  },
  methods: {
    onSubmit(results) {
      this.results = results
    },
    onReset() {
      this.results = null
    }
  }
}
</script>