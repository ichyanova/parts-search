import { useEffect } from 'react';
import { clearBrands, clearGoods, brandParts } from '@/store/searchSlice';
import { useDispatch } from 'react-redux';

/**
 * Хук для поиска брендов
 * @param {string} query - Текст запроса
 * @param {string} apiKey - Ключ пользователя
 * @returns {void}
 */
export default function useSearch(query, apiKey) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearBrands());
      dispatch(clearGoods());
      return;
    }

    let promise;
    const timer = setTimeout(() => {
      promise = dispatch(brandParts({ key: apiKey, number: query }));
    }, 300);

    return () => {
      clearTimeout(timer);
      promise?.abort();
    };
  }, [query, apiKey, dispatch]);
};
