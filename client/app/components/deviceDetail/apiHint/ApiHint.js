import React from 'react';
import R from 'ramda';
import { createEventHandler, componentFromStream } from 'recompose';
import { Observable } from 'rxjs/Observable';
import { Code, Heading, TabItem } from 'mcs-lite-ui';
import {
  Container, CodeWrapper, StyledCopyButton, StyledP, Header, StyledHr, Body,
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
const DEFAULT_METHOD = 'retrieve';

const ApiHint = componentFromStream((propStream) => {
  const props$ = Observable.from(propStream);
  const { handler: onTabChange, stream: onTabChangeStream } = createEventHandler();
  const { handler: onDCIdChange, stream: onDCIdChangeStream } = createEventHandler();
  const { handler: onMethodChange, stream: onMethodChangeStream } = createEventHandler();
  const deviceId$ = props$.pluck('deviceId');
  const deviceKey$ = props$.pluck('deviceKey');
  const datachannels$ = props$.pluck('datachannels');
  const language$ = Observable.from(onTabChangeStream).startWith(DEFAULT_LANGUAGE);
  const datachannelId$ = datachannels$
    .map(R.pipe(R.head, R.prop('datachannelId'))) // Hint: Start with first value
    .merge(Observable.from(onDCIdChangeStream).map(R.path(['target', 'value'])));
  const datachannel$ = datachannelId$
    .withLatestFrom(datachannels$, (datachannelId, datachannels) =>
      R.find(R.propEq('datachannelId', datachannelId))(datachannels),
    );
  const method$ = Observable
    .from(onMethodChangeStream)
    .map(R.path(['target', 'id']))
    .startWith(DEFAULT_METHOD);
  const code$ = Observable.combineLatest(
      deviceId$.distinctUntilChanged(),
      datachannel$,
      language$.distinctUntilChanged(),
      deviceKey$.distinctUntilChanged(),
      method$.distinctUntilChanged(),
    )
    .switchMap(array => fetchAPIHint(...array)); // Remind: The array MUST in order.

  return props$.combineLatest(
    code$,
    datachannelId$,
    language$,
    datachannel$,
    method$,
    (
      { datachannels, deviceId, getMessages: t },
      code, datachannelId, language, datachannel, method,
    ) => (
      <Container>
        <Header>
          <div>
            <Heading level={4}>{t('helpful')}</Heading>
            <StyledP>{t('example')}</StyledP>
          </div>
          <select value={datachannelId} onChange={onDCIdChange}>
            {datachannels.map(e =>
              <option key={e.datachannelId} value={e.datachannelId}>
                {e.datachannelName}
              </option>,
            )}
          </select>
        </Header>
        <StyledHr />

        <Body>
          <div>{t('datachannelName')}{datachannel.datachannelName}</div>
          <div>{t('datachannelId')}{datachannel.datachannelId}</div>
          <div>
            {t('apiType')}
            <RadioGroup>
              {
                [
                  { value: 'upload', children: t('upload') },
                  { value: 'retrieve', children: t('retrieve') },
                ].map(e =>
                  <span key={e.value}>
                    <input
                      type="radio"
                      name={e.value}
                      id={e.value}
                      onChange={onMethodChange}
                      checked={e.value === method}
                    />
                    <label htmlFor={e.value}>{e.children}</label>
                  </span>,
                )
              }
            </RadioGroup>
          </div>
        </Body>

        <div>
          {LANGUAGES.map(e =>
            <TabItem
              key={e.value}
              {...e}
              onClick={(event, value) => onTabChange(value)}
              active={language === e.value}
            />,
          )}
        </div>

        <CodeWrapper>
          <StyledCopyButton text={code}>{t('copy')}</StyledCopyButton>
          <Code>{code}</Code>
        </CodeWrapper>
      </Container>
    ),
  );
});


export default ApiHint;
