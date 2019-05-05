import React from 'react';
import { shallow } from 'enzyme';
import ScrollList from './ScrollList';

describe('<ScrollList />', () => {
  let wrapper;

  const defaultProps = {
    items: [
      { id: 'testId0', content: 'Test content 0' },
      { id: 'testId1', content: 'Test content 1' },
      { id: 'testId2', content: 'Test content 2' },
    ],
    mapFn: item => (
      <div key={item.id} id={item.id}>
        {item.content}
      </div>
    ),
  };

  const factory = props => <ScrollList {...defaultProps} {...props} />;

  it('should match snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {});
});
