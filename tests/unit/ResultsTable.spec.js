import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import ResultsTable from '@/components/ResultsTable.vue'

const results = {
  sample_size: 10,
  sample_mean: 5.5,
  standard_deviation: 1.5,
  hypothesized_mean: 5
}

const resultsNoHypothesis = {
  sample_size: 10,
  sample_mean: 5.5,
  standard_deviation: 1.5
}

test('renders table with results', () => {
  const wrapper = mount(ResultsTable, {
    global: {
      plugins: [BootstrapVue3]
    },
    props: {
      results
    }
  })

  expect(wrapper.text()).toContain('Sample Size')
  expect(wrapper.text()).toContain(results.sample_size.toString())
  expect(wrapper.text()).toContain('Sample Mean')
  expect(wrapper.text()).toContain(results.sample_mean.toString())
  expect(wrapper.text()).toContain('Standard Deviation')
  expect(wrapper.text()).toContain(results.standard_deviation.toString())
	expect(wrapper.text()).toContain('Hypothesized Mean')
	expect(wrapper.text()).toContain(results.hypothesized_mean.toString())
})

test('renders table without hypothesis results', () => {
	const wrapper = mount(ResultsTable, {
		global: {
			plugins: [BootstrapVue3]
		},
		props: {
			results: resultsNoHypothesis
		}
	})

	expect(wrapper.text()).not.toContain('Hypothesized Mean')
})

test('does not render table when results are not provided', () => {
	const wrapper = mount(ResultsTable, {
		global: {
			plugins: [BootstrapVue3]
		}
	})

	expect(wrapper.text()).toBe('')
})
