import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton.vue';

describe('BaseButton', () => {
  it('should render slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });
    expect(wrapper.text()).toContain('Click me');
  });

  it('should apply correct type class', () => {
    const wrapper = mount(BaseButton, {
      props: { type: 'danger' },
    });
    expect(wrapper.classes()).toContain('base-button--danger');
  });

  it('should apply correct size class', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'large' },
    });
    expect(wrapper.classes()).toContain('base-button--large');
  });

  it('should emit click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('should not emit click when loading', async () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('should show loading icon when loading', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
    });
    expect(wrapper.find('.loading-icon').exists()).toBe(true);
  });

  it('should apply disabled class', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('base-button--disabled');
  });
});
