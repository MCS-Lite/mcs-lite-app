import React, { Component } from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import lifecycle from 'recompose/lifecycle';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import InputSelect from 'mtk-ui/lib/InputSelect';
import InputForm from 'mtk-ui/lib/InputForm';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const UseExampleLayout = ({
  prototypeTemplates = [],
  inputSelectItems = [],
  onInputSelectChange,
  getMessages: t,
}) => {
  return (
    <InputForm
      kind="horizontal"
      style={{ backgroundColor: 'white' }}
    >
      <InputSelect
        placeholder={t('selectExample')}
        items={inputSelectItems}
        value=""
        label={t('selectExample')}
        filterFunc={() => true}
        onChange={onInputSelectChange}
      />
    </InputForm>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  lifecycle({
    componentWillMount() {
      this.props.retrievePrototypeTemplates();
    },
  }),
  withPropsOnChange(['prototypeTemplates'], ({ prototypeTemplates = [] }) => ({
    prototypeTemplatesSet: prototypeTemplates.reduce((prev, template) => ({
      ...prev,
      [template.prototypeId]: template,
    }), {}),
    inputSelectItems: prototypeTemplates.map(prototype => ({
      value: prototype.prototypeId,
      children: prototype.prototypeName,
    })),
  })),
  withHandlers({
    onInputSelectChange: props => (e, value) => {
      props.setSelectedTemplate(props.prototypeTemplatesSet[value]);
      props.setCreatePrototypeType(0);
    },
  })
)(UseExampleLayout)
