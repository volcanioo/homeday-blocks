import { mount } from '@vue/test-utils';
import Vue from 'vue';
import HdNotifications from '@/components/notifications/HdNotifications.vue';

const NOTIFICATIONS = [
  {
    text: 'Hello world',
  },
  {
    text: 'Welcome to',
    url: 'https://www.homeday.de',
    urlLabel: 'Homeday',
  },
];

describe('HdNotifications', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdNotifications, {
      propsData: {
        notifications: NOTIFICATIONS,
      },
      scopedSlots: {
        default: `<p>
          {{props.notification.text}}
          <a v-if="props.notification.url" href="props.notification.url">{{props.notification.urlLabel}}</a>
        </p>`,
      },
    });
  });

  it('renders the component corrently', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('fires the heightChange event when height of the notifications changes', () => {
    // A random number, used just to make sure it's not 0 and that the height actually changes
    const mockedScrollHeight = jest.fn(() => 123);

    wrapper.setMethods({ getScrollHeight: mockedScrollHeight });

    wrapper.setProps({ notifications: NOTIFICATIONS.slice(-1) });

    return Vue.nextTick()
      .then(() => {
        expect(wrapper.emitted('heightChange')).toBeTruthy();
      });
  });
});
