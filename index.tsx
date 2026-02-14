import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // إضافة محاولة أخيرة لإنشاء العنصر إذا لم يكن موجوداً (لأغراض الأمان)
  const fallbackRoot = document.createElement('div');
  fallbackRoot.id = 'root';
  document.body.appendChild(fallbackRoot);
  
  const root = ReactDOM.createRoot(fallbackRoot);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}