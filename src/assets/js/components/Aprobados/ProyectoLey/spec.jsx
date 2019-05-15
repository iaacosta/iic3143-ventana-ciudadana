import React from 'react';
import { shallow } from 'enzyme';
import ProyectoLey from './ProyectoLey';

describe('<ProyectoLey />', () => {
  let wrapper;

  const defaultProps = {
    boletin: 'test-boletin',
    resumen: 'Test resumen',
  };

  const factory = props => <ProyectoLey {...defaultProps} {...props} />;

  test('debe mantener snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  test('debe renderear correctamente', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('li').children().length).toBe(3);
  });

  test('debe mostrar el boletin', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.ley-item__boletin').exists()).toBe(true);
    expect(wrapper.find('.ley-item__boletin').contains(defaultProps.boletin)).toBe(true);
  });

  test('debe mostrar el resumen', () => {
    wrapper = shallow(factory());
    expect(wrapper.find('.ley-item__resumen').exists()).toBe(true);
    expect(wrapper.find('.ley-item__resumen').contains(defaultProps.resumen)).toBe(true);
  });

  test('debe mostrar resumen acortado si tiene más de 80 caracteres', () => {
    wrapper = shallow(factory({ resumen: new Array(150).join('a') }));
    expect(wrapper.find('.ley-item__resumen').prop('children')).toHaveLength(83);
    expect(wrapper.find('.ley-item__resumen').prop('children')).toBe(
      `${new Array(81).join('a')}...`,
    );
  });
});
