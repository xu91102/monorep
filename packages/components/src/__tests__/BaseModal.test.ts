import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from '../components/BaseModal.vue';

describe('BaseModal', () => {
  it('should not render when visible is false', () => {
    const wrapper = mount(BaseModal, {
      props: { visible: false },
      global: {
        stubs: { teleport: true },
      },
    });
    expect(wrapper.find('.modal-overlay').exists()).toBe(false);
  });

  it('should render when visible is true', () => {
    const wrapper = mount(BaseModal, {
      props: { visible: true },
      global: {
        stubs: { teleport: true },
      },
    });
    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
  });

  it('should render title when provided', () => {
    const wrapper = mount(BaseModal, {
      props: { visible: true, title: 'Modal Title' },
      global: {
        stubs: { teleport: true },
      },
    });
    expect(wrapper.find('.modal-title').text()).toBe('Modal Title');
  });

  it('should emit close when close button clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: { visible: true, closable: true },
      global: {
        stubs: { teleport: true },
      },
    });
    await wrapper.find('.modal-close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.emitted('update:visible')).toBeTruthy();
  });

  it('should emit close when overlay clicked if maskClosable', async () => {
    const wrapper = mount(BaseModal, {
      props: { visible: true, maskClosable: true },
      global: {
        stubs: { teleport: true },
      },
    });
    await wrapper.find('.modal-overlay').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('should not emit close when overlay clicked if not maskClosable', async () => {
    const wrapper = mount(BaseModal, {
      props: { visible: true, maskClosable: false },
      global: {
        stubs: { teleport: true },
      },
    });
    await wrapper.find('.modal-overlay').trigger('click');
    expect(wrapper.emitted('close')).toBeUndefined();
  });
});
