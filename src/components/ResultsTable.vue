<template>
	<div v-if="results" class="table-responsive">
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Property</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Sample Size</td>
					<td>{{ results.sample_size }}</td>
				</tr>
				<tr>
					<td>Sample Mean</td>
					<td>{{ results.sample_mean }}</td>
				</tr>
				<tr>
					<td>Standard Deviation</td>
					<td>{{ results.standard_deviation }}</td>
				</tr>
				<tr v-if="hasHypothesisTest">
					<td>Hypothesized Mean</td>
					<td>{{ results.hypothesized_mean }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		results: Object
	},
	computed: {
		hasHypothesisTest() {
			return this.results && this.results.hypothesized_mean !== undefined
		}
	}
}
</script>
