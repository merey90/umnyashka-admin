import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';

import config from './config';
import { Metric } from 'web-vitals';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

let app = initializeApp(firebaseConfig),
  analytics: Analytics,
  logWebVitals = (metric: Metric) => {
    console.info(metric);
  };

if (config.appEnv === 'production') {
  analytics = getAnalytics(app);
  logWebVitals = (metric) => {
    logEvent(analytics, 'web_vitals', {
      ...metric,
    });
  };
}

export { app, analytics, logWebVitals };
