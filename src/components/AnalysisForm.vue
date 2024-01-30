<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-input v-model="sample_size" type="number" min="2" step="1" required></b-form-input>
    <b-form-input v-model="sample_mean" type="number" required></b-form-input>
    <b-form-input v-model="standard_deviation" type="number" min="0.01" step="0.01" required></b-form-input>
    <b-form-checkbox v-model="perform_hypothesis_test">Perform hypothesis test</b-form-checkbox>
    <b-form-input v-if="perform_hypothesis_test" v-model="hypothesized_mean" type="number" required></b-form-input>
    <b-button type="submit">OK</b-button>
    <b-button type="reset">Reset</b-button>
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
      perform_hypothesis_test: false,
    };
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
    },
  },
};
</script>