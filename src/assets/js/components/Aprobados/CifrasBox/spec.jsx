import React from 'react';
import { shallow } from 'enzyme';
import CifrasBox from './CifrasBox';

describe('<CifrasBox />', () => {
  let wrapper;

  const defaultProps = {
    cifra: 20,
    label: 'Test label',
    estado: 'aprobado',
  };

  const factory = props => <CifrasBox {...defaultProps} {...props} />;

  test('debe mantener snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  test('debe renderear correctamente', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.cifras__box').exists()).toBe(true);
    expect(wrapper.find('.cifras__box').children().length).toBe(2);
  });

  test('debe mostrar el label', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.cifras__label').exists()).toBe(true);
    expect(wrapper.find('.cifras__label').contains(defaultProps.label)).toBe(true);
  });

  test('debe mostrar la cifra', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.cifras__cifra').exists()).toBe(true);
    expect(wrapper.find('.cifras__cifra').contains(defaultProps.cifra)).toBe(true);
  });

  test('debe agregar la clase correspondiente', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.cifras__cifra').hasClass('cifras__cifra--aprobado')).toBe(true);
  });
});
