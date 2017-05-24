/* global window */
import {
  createFetch,
  base,
  parse,
  method as hcMethod,
  params,
} from 'http-client';

/**
 * Handle response - throw or just return
 * @author Michael Hsu
 */
function handleResponse(response) {
  const data = response.jsonData;
  if (!response.ok) {
    console.error(data); // eslint-disable-line
    return data.message;
  }
  return data;
}

const fetchAPIHint = (deviceId, datachannel, language, deviceKey, method) => {
  const fetch = createFetch(
    base(window.apiUrl),
    hcMethod('GET'),
    params({ deviceKey }),
    parse('json', 'jsonData'),
  );

  return fetch(
    `/devices/${deviceId}/datachannels/${datachannel.datachannelId}/datachanneltypes/${datachannel.channelType.id}/methods/${method}/types/${datachannel.type}/contents/${language}`,
  ).then(handleResponse);
};

export default fetchAPIHint;
