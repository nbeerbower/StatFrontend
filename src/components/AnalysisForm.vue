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

    <b-form-group label="Sample Mean">
      <b-form-input v-model="sample_mean" type="number" step="0.01" required class="mb-3">
      </b-form-input>
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

    <b-form-group>
      <b-form-checkbox v-model="perform_hypothesis_test" class="mb-3"
        >Perform hypothesis test</b-form-checkbox
      >
    </b-form-group>
    <b-form-group :disabled="!perform_hypothesis_test" label="Hypothesized Mean">
      <b-form-input v-model="hypothesized_mean" type="number" required class="mb-3"></b-form-input>
    </b-form-group>

    <div class="d-flex justify-content-end py-3">
      <b-button type="submit" variant="primary" size="lg" class="mx-4" @click.prevent="onSubmit">OK</b-button>
      <b-button type="reset" variant="secondary" size="lg" @click.prevent="onReset">Reset</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      default_values: {},
      sample_size: null,
      sample_mean: null,
      standard_deviation: null,
      hypothesized_mean: null,
      perform_hypothesis_test: false
    }
  },
  mounted() {
    // Fetch the default values
    fetch('/data/defaults.json')
      .then((response) => response.json())
      .then((data) => {
        this.default_values = data
        this._updateDefaultValues()
      })
  },
  methods: {
    onSubmit() {
			// Reset the error message
			this.error_message = null
      // Check the validity of the form fields and either display an error message or the entered values in a table.
			const isValid = this._validateForm()
			if (!isValid) {
				this.onError(this.error_message)
				return
			}

			// Emit the results to the parent component
			this.$emit('submit', {
				sample_size: this.sample_size,
				sample_mean: this.sample_mean,
				standard_deviation: this.standard_deviation,
				hypothesized_mean: this.perform_hypothesis_test ? this.hypothesized_mean : undefined
			})
    },
    onReset() {
			// Reset the error message
			this.error_message = null
      // Reset the form fields to their initial values.
			this._updateDefaultValues()
			// Emit the reset event to the parent component
			this.$emit('reset')
    },
		onError() {
			// Reset the error message
			this.$emit('error', this.error_message)
		},
		_validateForm() {
			// Check sample size is at least 2
			if (this.sample_size < 2) {
				this.error_message = 'The sample size must be at least 2.'
				return false
			}
			// Check sample size is a whole number
			if (this.sample_size % 1 !== 0) {
				this.error_message = 'The sample size must be a whole number.'
				return false
			}
			// Check sample mean is a number
			if (isNaN(this.sample_mean)) {
				this.error_message = 'The sample mean must be a number.'
				return false
			}
			// Check standard deviation is greater than 0
			if (this.standard_deviation <= 0) {
				this.error_message = 'The standard deviation must be greater than 0.'
				return false
			}
			// Check hypothesized mean is a number
			if (this.perform_hypothesis_test && isNaN(this.hypothesized_mean)) {
				this.error_message = 'The hypothesized mean must be a number.'
				return false
			}
			return true
		},
    _updateDefaultValues() {
      this.sample_size = this.default_values.sample_size
      this.sample_mean = this.default_values.sample_mean
      this.standard_deviation = this.default_values.standard_deviation
      this.hypothesized_mean = this.default_values.hypothesized_mean
			this.perform_hypothesis_test = this.hypothesized_mean != undefined
    }
  }
}
</script>