import React, { PropTypes } from 'react';
import R from 'ramda';
import { createEventHandler, componentFromStream } from 'recompose';
import { Observable } from 'rxjs/Observable';
import { Code, Heading, TabItem, Select } from 'mcs-lite-ui';
import {
  Container,
  CodeWrapper,
  StyledCopyButton,
  StyledP,
  SelectWrapper,
  StyledHr,
  Body,
  RadioGroup,
} from './styled-components';
import fetchAPIHint from './fetch';
import '../../../utils/rxjs';

const LANGUAGES = [
  { value: 'javascript', children: 'Javascript' },
  { value: 'arduino', children: 'Arduino' },
  { value: 'talnet', children: 'Talnet' },
];
const DEFAULT_LANGUAGE = 'javascript';
const DEFAULT_METHOD = 'upload';

const mapLanguageByValue = R.cond([
  [R.equals('talnet'), R.always('javascript')],
  [R.T, R.identity],
]);

const ApiHint = componentFromStream(propStream => {
  const props$ = Observable.from(propStream);
  const {
    handler: onTabChange,
    stream: onTabChangeStream,
  } = createEventHandler();
  const {
    handler: onDCIdChange,
    stream: onDCIdChangeStream,
  } = createEventHandler();
  const {
    handler: onMethodChange,
    stream: onMethodChangeStream,
  } = createEventHandler();
  const deviceId$ = props$.pluck('deviceId');
  const deviceKey$ = props$.pluck('deviceKey');
  const datachannels$ = props$.pluck('datachannels');
  const language$ = Observable.from(onTabChangeStream).startWith(
    DEFAULT_LANGUAGE,
  );
  const datachannelId$ = datachannels$
    .filter(R.complement(R.isEmpty))
    .map(R.pipe(R.head, R.prop('datachannelId'))) // Hint: Start with first value
    .merge(
      Observable.from(onDCIdChangeStream).map(R.path(['target', 'value'])),
    );
  const datachannel$ = datachannelId$.withLatestFrom(
    datachannels$,
    (datachannelId, datachannels) =>
      R.find(R.propEq('datachannelId', datachannelId))(datachannels),
  );
  const method$ = Observable.from(onMethodChangeStream)
    .map(R.path(['target', 'id']))
    .startWith(DEFAULT_METHOD);
  const code$ = Observable.combineLatest(
    deviceId$.distinctUntilChanged(),
    datachannel$,
    language$.distinctUntilChanged(),
    deviceKey$.distinctUntilChanged(),
    method$.distinctUntilChanged(),
  )
    .switchMap(array => fetchAPIHint(...array)) // Remind: The array MUST be in order.
    .startWith('');

  return props$.combineLatest(
    code$,
    datachannelId$,
    language$,
    datachannel$,
    method$,
    (
      { datachannels, deviceId, getMessages: t },
      code,
      datachannelId,
      language,
      datachannel,
      method,
    ) => (
      <Container>
        <div>
          <Heading level={4}>{t('helpful')}</Heading>
          <StyledP>{t('example')}</StyledP>
        </div>

        <StyledHr />

        <Body>
          <SelectWrapper>
            {t('datachannelName')}
            <Select
              value={datachannelId}
              onChange={onDCIdChange}
              items={datachannels.map(e => ({
                value: e.datachannelId,
                children: e.datachannelName,
              }))}
            />
          </SelectWrapper>
          <div>{t('datachannelId')}{datachannel.datachannelId}</div>
          <div>
            {t('apiType')}
            <RadioGroup>
              {[
                { value: 'upload', children: t('upload') },
                { value: 'retrieve', children: t('retrieve') },
              ].map(e => (
                <span key={e.value}>
                  <input
                    type="radio"
                    name={e.value}
                    id={e.value}
                    onChange={onMethodChange}
                    checked={e.value === method}
                  />
                  <label htmlFor={e.value}>{e.children}</label>
                </span>
              ))}
            </RadioGroup>
          </div>
        </Body>

        <div>
          {LANGUAGES.map(e => (
            <TabItem
              key={e.value}
              {...e}
              onClick={(event, value) => onTabChange(value)}
              active={language === e.value}
            />
          ))}
        </div>

        <CodeWrapper>
          <StyledCopyButton text={code}>{t('copy')}</StyledCopyButton>
          <Code language={mapLanguageByValue(language)}>{code}</Code>
        </CodeWrapper>
      </Container>
    ),
  );
});

ApiHint.displayName = 'ApiHint';
ApiHint.propTypes = {
  // Props
  deviceId: PropTypes.string.isRequired,
  deviceKey: PropTypes.string.isRequired,
  datachannels: PropTypes.array.isRequired,

  // React-intl i18n
  getMessages: PropTypes.func.isRequired,
};

export default ApiHint;
