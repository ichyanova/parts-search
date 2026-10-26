const PRICE_API_URL = 'https://api.favorit-parts.ru/hs/hsprice/';

const ERRORS = {
  'Empty key!': 'Не указан ключ покупателя',
  'Invalid key client!': 'Неверный ключ покупателя',
  'Invalid access key': 'Неверный ключ покупателя',
  'Empty number goods!': 'Не указан номер детали',
  'Request quota exceeded!': 'Превышен лимит запросов по грузовому ассортименту',
};

function normalizeError(error) {
  const message = typeof error === 'string' ? error.trim() : '';
  return ERRORS[message] || message || 'Сервис вернул ошибку без описания.';
}

export function parsePriceBody(respText, ok = true) {
  let data;
  try {
    data = JSON.parse(respText);
  } catch {
    throw new Error(ok ? 'Сервис вернул некорректный ответ.' : 'Сервис недоступен. Повторите запрос позже.');
  }

  if (data && typeof data === 'object' && data.error) {
    return { error: normalizeError(data.error) };
  }

  if (!ok) {
    throw new Error('Сервис недоступен. Повторите запрос позже.');
  }

  if (!data || typeof data !== 'object' || !Array.isArray(data.goods)) {
    throw new Error('Сервис вернул некорректный ответ.');
  }

  return {
    goods: data.goods,
  };
}

export async function fetchPrices({ key = '', number = '', brand = '', analogues = false } = {}, signal) {
  const params = new URLSearchParams();
  const brandValue = brand.trim();

  params.set('key', key.trim());
  params.set('number', number.trim());
  if (brandValue) {
    params.set('brand', brandValue);
  }
  if (brandValue && analogues) {
    params.set('analogues', 'on');
  }

  let response;
  try {
    response = await fetch(`${PRICE_API_URL}?${params.toString()}`, {
      signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }
    throw new Error('Не удалось связаться с сервисом. Проверьте подключение к сети.');
  }

  const text = await response.text();
  return parsePriceBody(text, response.ok);
}
