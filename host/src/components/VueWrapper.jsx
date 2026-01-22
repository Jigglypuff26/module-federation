import React, { useEffect, useRef, useState } from 'react';

/**
 * VueWrapper - интеграция Vue 3 в React через Module Federation
 */
export const VueWrapper = () => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadVueApp = async () => {
      try {
        // Динамически загружаем Vue (shared dependency)
        const Vue = await import('vue');

        // Загружаем Vue компонент через Module Federation
        const VueComponent = await import('vueRemote/App');

        if (isMounted && containerRef.current) {
          const component = VueComponent.default || VueComponent;

          // Создаем и монтируем Vue приложение
          appRef.current = Vue.createApp(component);
          appRef.current.mount(containerRef.current);

          console.log('✅ Vue remote app loaded successfully via Module Federation');
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Failed to load Vue app:', err);
        if (isMounted) {
          setError(err.message || 'Unknown error');
          setLoading(false);
        }
      }
    };

    loadVueApp();

    return () => {
      isMounted = false;
      if (appRef.current) {
        appRef.current.unmount();
      }
    };
  }, []);

  return (
    <div>
      {loading && <div className="loading">Loading Vue application...</div>}

      {error && (
        <div className="error">
          <h3>Error loading Vue application</h3>
          <p>{error}</p>
        </div>
      )}

      <div ref={containerRef} style={{ display: loading ? 'none' : 'block' }} />
    </div>
  );
};
