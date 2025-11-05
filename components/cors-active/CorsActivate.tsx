import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ExternalLink, AlertTriangle, RefreshCw } from 'lucide-react';

export const CorsActivate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCorsPage = () => {
    window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div
        className={clsx(
          'bg-gray-50 rounded-xl shadow-lg max-w-md w-full transform transition-all duration-300 border border-gray-300',
          {
            'scale-95 opacity-0': !isVisible,
            'scale-100 opacity-100': isVisible,
            'animate-[bounce_1s_ease-in-out_1]': isVisible,
          }
        )}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-300 bg-white rounded-t-xl">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Требуется разрешение CORS
            </h2>
            <p className="text-gray-600 text-sm">
              Необходимо активировать доступ к данным
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3 bg-gray-50">
          <p className="text-gray-700 text-sm">
            Для работы приложения требуется временный доступ к CORS-прокси.
          </p>

          <div className="bg-gray-200 rounded-lg p-3">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">
              Инструкция:
            </h3>
            <ol className="text-gray-700 text-sm space-y-1 list-decimal list-inside">
              <li>Нажмите &quot;Перейти к активации CORS&quot;</li>
              <li>
                На открывшейся странице нажмите кнопку:
                <div className='w-[80%] mx-auto py-1 border border-solid border-black rounded-sm text-center text-sm text-black'>
                  Request temporary access to the demo server
                </div>
              </li>
              <li>Вернитесь сюда и нажмите &quot;Обновить страницу&quot;</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 bg-white rounded-b-xl border-t border-gray-300">
          <button
            onClick={handleOpenCorsPage}
            className={clsx(
              'flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg',
              'hover:bg-gray-900 transition-colors duration-200 font-medium text-sm'
            )}
          >
            <ExternalLink className="w-4 h-4" />
            Перейти к активации CORS
          </button>

          <button
            onClick={handleRetry}
            className={clsx(
              'flex items-center justify-center gap-2 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg',
              'hover:bg-gray-100 transition-colors duration-200 font-medium text-sm'
            )}
          >
            <RefreshCw className="w-4 h-4" />
            Обновить страницу
          </button>
        </div>
      </div>
    </div>
  );
};