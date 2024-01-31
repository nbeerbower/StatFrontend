import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import AnalysisForm from '@/components/AnalysisForm.vue'

function setValidInputValues(wrapper) {
	// Set input values
	wrapper.find('#sample-size').setValue('10');
	wrapper.find('#sample-mean').setValue('5.5');
	wrapper.find('#standard-deviation').setValue('1.5');
	wrapper.find('#perform-hypothesis-test').setChecked();
	wrapper.find('#hypothesized-mean').setValue('5');
}

test('emits submit event with form data when form is submitted', async () => {
  const wrapper = mount(AnalysisForm, {
		global: {
			plugins: [BootstrapVue3]
		}
	});

  setValidInputValues(wrapper);

  // Trigger form submission
  await wrapper.find('form').trigger('submit.prevent');

  // Check emitted events
  const submitEvent = wrapper.emitted().submit;
  expect(submitEvent).toBeTruthy();
  expect(submitEvent[0][0]).toEqual({
    sample_size: '10',
    sample_mean: '5.5',
    standard_deviation: '1.5',
    hypothesized_mean: '5'
  });
});

test('updates data properties when input fields are changed', async () => {
  const wrapper = mount(AnalysisForm, {
		global: {
			plugins: [BootstrapVue3]
		}
	});

  // Set input values
  setValidInputValues(wrapper);

  // Check data properties
  expect(wrapper.vm.sample_size).toBe('10');
  expect(wrapper.vm.sample_mean).toBe('5.5');
  expect(wrapper.vm.standard_deviation).toBe('1.5');
  expect(wrapper.vm.perform_hypothesis_test).toBe(true);
	expect(wrapper.vm.hypothesized_mean).toBe('5');
});

test('invalid sample size causes validation error', async () => {
  const wrapper = mount(AnalysisForm, {
    global: {
      plugins: [BootstrapVue3]
    }
  });

	setValidInputValues(wrapper);

	// Set invalid sample size
  await wrapper.find('#sample-size').setValue('1'); // less than the minimum allowed value

  // Trigger form submission
  await wrapper.find('form').trigger('submit.prevent');

	// Check for error event
	const errorEvent = wrapper.emitted().error;
	expect(errorEvent).toBeTruthy();
});

test('invalid sample mean causes validation error', async () => {
	const wrapper = mount(AnalysisForm, {
		global: {
			plugins: [BootstrapVue3]
		}
	});

	setValidInputValues(wrapper);

	// Set invalid sample mean
	await wrapper.find('#sample-mean').setValue(''); // empty value

	// Trigger form submission
	await wrapper.find('form').trigger('submit.prevent');

	// Check for error event
	const errorEvent = wrapper.emitted().error;
	expect(errorEvent).toBeTruthy();
});

test('invalid standard deviation causes validation error', async () => {
	const wrapper = mount(AnalysisForm, {
		global: {
			plugins: [BootstrapVue3]
		}
	});

	setValidInputValues(wrapper);

	// Set invalid standard deviation
	await wrapper.find('#standard-deviation').setValue('0'); // less than the minimum allowed value

	// Trigger form submission
	await wrapper.find('form').trigger('submit.prevent');

	// Check for error event
	const errorEvent = wrapper.emitted().error;
	expect(errorEvent).toBeTruthy();
});

test('invalid hypothesized mean causes validation error', async () => {
	const wrapper = mount(AnalysisForm, {
		global: {
			plugins: [BootstrapVue3]
		}
	});

	setValidInputValues(wrapper);

	// Set invalid hypothesized mean
	await wrapper.find('#hypothesized-mean').setValue(''); // empty value

	// Trigger form submission
	await wrapper.find('form').trigger('submit.prevent');

	// Check for error event
	const errorEvent = wrapper.emitted().error;
	expect(errorEvent).toBeTruthy();
});