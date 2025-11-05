import { useState } from "react";

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string, opts?: RequestInit) => void;
};

export const useFetchData = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, opts: RequestInit = {}) => {
    if (!url) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, opts);

      // Разблокировка CORS
      if (response.status === 403) {
        throw new Error('CORS доступ заблокирован. Вам необходимо разрешить доступ. Сейчас откроется страница, на ней нажмите кнопку "Request temporary access to the demo server", запросы начнут работать.');
      }

      if (!response.ok) {
        switch (response.status) {
          case 404:
            setError(response.status + ' - ' + 'Продукты не найдены');
            break;
          case 403:
            setError('403 - Доступ запрещен');
            break;
          case 500:
            setError(response.status + ' - ' + 'Ошибка ответа сервера');
            break;
          default:
            setError(`${response.status} - Неизвестная ошибка`);
        }
        return;
      }

      const resData = await response.json();

      setData(resData);
      return resData;
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Ошибка парсинга JSON');
      } else if (err instanceof TypeError) {
        setError('Проблемы с сетью');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};