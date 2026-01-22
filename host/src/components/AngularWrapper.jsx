import React, { useEffect, useRef, useState } from 'react';

/**
 * AngularWrapper - правильная интеграция Angular в React через Module Federation
 * Согласно рекомендациям module-federation.io:
 * - Использование Angular Elements (Web Components)
 * - Прямой импорт remote модуля
 * - Использование shared dependencies (Angular singleton)
 */
export const AngularWrapper = () => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isElementDefined, setIsElementDefined] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAngularApp = async () => {
      try {
        console.log('🚀 Loading Angular Remote App via Module Federation...');
        setLoading(true);

        // Загружаем Angular Element через Module Federation
        const { angularElementReady } = await import('angularRemote/AppElement');
        console.log('✅ Angular Remote Element module loaded via Module Federation');
        console.log('📦 Using shared Angular instance with JIT compiler (singleton)');

        // Ждём завершения регистрации custom element
        console.log('⏳ Waiting for Angular Web Component registration...');
        await angularElementReady;

        if (isMounted) {
          console.log('✅ Angular Web Component registered and ready');
          console.log('🎯 Module Federation benefits:');
          console.log('  - Shared Angular runtime with JIT compiler (no duplication)');
          console.log('  - Web Components standard');
          console.log('  - Framework-agnostic integration');
          console.log('  - Dynamic module loading');
          setIsElementDefined(true);
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Failed to load Angular app:', err);
        if (isMounted) {
          setError(err.message || 'Unknown error');
          setLoading(false);
        }
      }
    };

    loadAngularApp();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h3>⏳ Loading Angular Remote App...</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Loading via Module Federation with Angular Elements (Web Components)
        </p>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
          Check console (F12) for Module Federation logs
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ color: '#c00' }}>❌ Error loading Angular application</h3>
        <p>
          <strong>Error:</strong> {error}
        </p>
        <p>
          <strong>Troubleshooting:</strong>
        </p>
        <ul>
          <li>Make sure Angular Remote is running on port 3003</li>
          <li>Check browser console (F12) for detailed errors</li>
          <li>
            Verify remoteEntry.js is accessible:{' '}
            <a
              href="http://localhost:3003/remoteEntry.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              remoteEntry.js
            </a>
          </li>
          <li>
            Try opening{' '}
            <a href="http://localhost:3003" target="_blank" rel="noopener noreferrer">
              http://localhost:3003
            </a>{' '}
            directly
          </li>
        </ul>
        <div
          style={{ marginTop: '15px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}
        >
          <strong>💡 Module Federation Status:</strong>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            Remote URL: http://localhost:3003/remoteEntry.js
            <br />
            Exposed Module: angularRemote/AppElement
            <br />
            Shared: Angular (singleton), Zone.js
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          padding: '10px',
          background: '#ffe7e7',
          border: '1px solid #dd0031',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
        }}
      >
        <strong>✅ Module Federation Active (Web Components)</strong>
        <p style={{ margin: '5px 0' }}>
          Angular component loaded via Module Federation using Angular Elements
        </p>
      </div>

      {isElementDefined && (
        <div ref={containerRef}>
          {/* Angular Web Component */}
          <angular-app-element />
        </div>
      )}
    </div>
  );
};
