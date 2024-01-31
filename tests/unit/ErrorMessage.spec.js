import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import ErrorMessage from '@/components/ErrorMessage.vue'

test('renders error message', () => {
	const wrapper = mount(ErrorMessage, {
		global: {
			plugins: [BootstrapVue3]
		},
		props: {
			message: 'An error occurred'
		}
	})

	expect(wrapper.text()).toContain('An error occurred')
})