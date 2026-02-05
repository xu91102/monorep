import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCard from '../components/BaseCard.vue';

describe('BaseCard', () => {
  it('should render slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: { default: 'Card content' },
    });
    expect(wrapper.text()).toContain('Card content');
  });

  it('should render title when provided', () => {
    const wrapper = mount(BaseCard, {
      props: { title: 'Card Title' },
    });
    expect(wrapper.text()).toContain('Card Title');
  });

  it('should apply bordered class when bordered prop is true', () => {
    const wrapper = mount(BaseCard, {
      props: { bordered: true },
    });
    expect(wrapper.classes()).toContain('base-card--bordered');
  });

  it('should apply shadow class when shadow prop is true', () => {
    const wrapper = mount(BaseCard, {
      props: { shadow: true },
    });
    expect(wrapper.classes()).toContain('base-card--shadow');
  });
});
