<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Sample Size">
      <b-form-input
        v-model="sample_size"
        type="number"
        min="2"
        step="1"
        required
        class="mb-3"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Standard Deviation">
      <b-form-input
        v-model="standard_deviation"
        type="number"
        min="0.01"
        step="0.01"
        required
        class="mb-3"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Sample Mean">
      <b-form-input v-model="sample_mean" type="number" required class="mb-3"></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-checkbox v-model="perform_hypothesis_test" class="mb-3"
        >Perform hypothesis test</b-form-checkbox
      >
    </b-form-group>
    <b-form-group :disabled="!perform_hypothesis_test" label="Hypothesized Mean">
      <b-form-input v-model="hypothesized_mean" type="number" required class="mb-3"></b-form-input>
    </b-form-group>

    <div class="d-flex justify-content-end py-3">
      <b-button type="submit" variant="primary" size="lg" class="mx-4">OK</b-button>
      <b-button type="reset" variant="secondary" size="lg">Reset</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      sample_size: null,
      sample_mean: null,
      standard_deviation: null,
      hypothesized_mean: null,
      perform_hypothesis_test: false
    }
  },
  mounted() {
    // Fetch the default values from the JSON file or mock REST API and assign them to the data properties.
  },
  methods: {
    onSubmit() {
      // Check the validity of the form fields and either display an error message or the entered values in a table.
    },
    onReset() {
      // Reset the form fields to their initial values.
    }
  }
}
</script>