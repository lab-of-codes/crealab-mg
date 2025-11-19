// js/tahvago-api.js

const TAHVAGO_BASE_URL = 'https://back.tahvago.com.br';


const TAHVAGO_API_KEY = 'Sq6iEEwaShluyHM6jo7ePnJwOE02x76ykXt2J18tXossLiyo2V4qLlxvYt5TwIN7';


async function tahvagoGet(path) {
  const response = await fetch(`${TAHVAGO_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'tahvago-api-key': TAHVAGO_API_KEY,
    },
  });

  if (!response.ok) {
    console.error('Erro na TahVago API:', response.status, response.statusText);
    throw new Error(`Erro na TahVago API: ${response.status}`);
  }

  return response.json();
}


async function tahvagoGetInstalacoes() {
  return tahvagoGet('/external/instalacoes');
}
