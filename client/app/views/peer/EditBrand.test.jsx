/* eslint-disable */
import React from 'react';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditBrand from '../Edit';
import { creators, microsoftChannels } from '../../../../Platform/utils/mocks/creators';

Enzyme.configure({ adapter: new Adapter() });

describe('<EditBrand /> - default state', () => {
  let wrapper;
  const createSpy = sinon.spy();
  const searchSpy = sinon.spy();
  const highlightSpy = sinon.spy();
  const currentChannels = [];

  beforeEach(() => {
    wrapper = mount(<EditBrand
      onSubmit={createSpy}
      handleSearch={searchSpy}
      onHighlight={highlightSpy}
      creatorCount={1}
      creator={creators[0]}
      brandName=""
      key={currentChannels[0] ? currentChannels[0].id : 0} />)
   });

  it('+++ render the component', () => {
     expect(wrapper.find(EditBrand).length).toEqual(1)
  });

  it('+++ Expect channels to be hidden with a height of 0', () => {
    expect(wrapper.find('.EditBrandsCollapse').first().prop('in')).toEqual(false);
  });

  it('+++ Expect there to be 4 channel fields after clicking arrow', () => {
    wrapper.find('ExpandMoreIcon').simulate('click');
    expect(wrapper.find('.EditBrandsCollapse').first().prop('in')).toEqual(true);
    expect(wrapper.find('.EditBrandsCollapse').last().find('InputBase').length).toEqual(4)
  });

  it('+++ Expect blur to trigger validation', () => {
    wrapper.find('ExpandMoreIcon').simulate('click'); // open sesame

    // Facebook Channel Field
    const fbElem = wrapper.find('.ChannelTextField input[name="facebook"]');
    let fbMtElem = wrapper.find('.ChannelTextField[name="facebook"]').first();
    fbElem.simulate('focus');
    fbElem.simulate('change', { target: { name: 'facebook', value: 'FBSpaceX' } });
    fbElem.simulate('blur');
    fbMtElem = wrapper.find('.ChannelTextField[name="facebook"]').first(); // we have to refind to ensure we have the newest node
    expect(fbMtElem.props().value).toEqual('FBSpaceX')
    expect(fbMtElem.props().helperText).toEqual('Invalid Facebook URL')

    // YouTube Channel Field
    const ytElem = wrapper.find('.ChannelTextField input[name="youtube"]');
    let ytMtElem = wrapper.find('.ChannelTextField[name="youtube"]').first();
    ytElem.simulate('focus');
    ytElem.simulate('change', { target: { name: 'youtube', value: 'YTSpaceX' } });
    ytElem.simulate('blur');
    ytMtElem = wrapper.find('.ChannelTextField[name="youtube"]').first();
    expect(ytMtElem.props().value).toBe("YTSpaceX")
    expect(ytMtElem.props().helperText).toBe("Invalid YouTube URL")

    // Instagram Channel Field
    const igElem = wrapper.find('.ChannelTextField input[name="instagram"]');
    let igMtElem = wrapper.find('.ChannelTextField[name="instagram"]').first();
    igElem.simulate('focus');
    igElem.simulate('change', { target: { name: 'instagram', value: 'IGSpaceX' } });
    igElem.simulate('blur');
    igMtElem = wrapper.find('.ChannelTextField[name="instagram"]').first();
    expect(igMtElem.props().value).toBe("IGSpaceX")
    expect(igMtElem.props().helperText).toBe("Invalid Instagram URL")

    // Twitter Channel Field
    const twElem = wrapper.find('.ChannelTextField input[name="twitter"]');
    let twMtElem = wrapper.find('.ChannelTextField[name="twitter"]').first();
    twElem.simulate('focus'); // try a diff approach this time
    twElem.simulate('change', { target: { name: 'twitter', value: 'TWSpaceX' } });
    twElem.simulate('blur');
    twMtElem = wrapper.find('.ChannelTextField[name="twitter"]').first();
    expect(twMtElem.props().value).toBe("TWSpaceX")
    expect(twMtElem.props().helperText).toBe("Invalid Twitter URL")

    // Twitter - Supply correct url
    twElem.simulate('focus'); // try a diff approach this time so we can ensure full coverage
    twElem.simulate('change', { target: { name: 'twitter', value: 'https://twitter.com/SpaceX' } });
    twElem.simulate('blur');

    twMtElem = wrapper.find('.ChannelTextField input[name="twitter"]').first();
    expect(twMtElem.props().value).toBe("https://twitter.com/SpaceX")
    expect(twMtElem.props().helperText).toBe(undefined)
  })

  it('+++ Expect submit click to trigger create', () => {
    wrapper.find('ExpandMoreIcon').simulate('click');
    wrapper.find('.EditButton').first().simulate('click');
    expect(createSpy.called).toEqual(true);
  });
});

describe('<EditBrand /> - Brand + No Channels Included', () => {
  let wrapper;
  const createSpy = sinon.spy();
  const searchSpy = sinon.spy();
  const highlightSpy = sinon.spy();
  const currentChannels = [];

  beforeEach(() => {
    wrapper = mount(<EditBrand
      onSubmit={createSpy}
      handleSearch={searchSpy}
      onHighlight={highlightSpy}
      creator={creators[0]}
      brandName="SpaceX"
      key={currentChannels[0] ? currentChannels[0].id : 0} />)
   });

   it('+++ Expect passing in brandName prop to be set as default brand name', () => {
     console.log(wrapper.find('.EditBrandName').first().props());
       expect(wrapper.find('.EditBrandName').first().props().defaultValue).toEqual('Microsoft')
   });
});

describe('<EditBrand /> - Brand + Channels Included', () => {
  let wrapper;
  const createSpy = sinon.spy();
  const searchSpy = sinon.spy();
  const highlightSpy = sinon.spy();
  const currentChannels = [];

  beforeEach(() => {
    wrapper = mount(<EditBrand
      onSubmit={createSpy}
      handleSearch={searchSpy}
      onHighlight={highlightSpy}
      creator={creators[0]}
      brandName="SpaceX"
      key={currentChannels[0] ? currentChannels[0].id : 0} />)
   });

   it('+++ Expect passing in brandName prop to be set as default brand name', () => {
       expect(wrapper.find('.EditBrandName').first().props().defaultValue).toEqual('Microsoft');
       wrapper.find('ExpandMoreIcon').simulate('click'); // open sesame
       expect(wrapper.find('.ChannelTextField[name="facebook"]').first().props().value).toEqual('Surface');
   });
});
