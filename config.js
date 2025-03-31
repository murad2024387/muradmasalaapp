// config.js
const AppConfig = {
  // ڈیٹابیس موڈ: 'local' یا 'server'
  databaseMode: 'local', // default لوکل سٹوریج
  
  // لوکل سٹوریج کنفیگریشن
  localStorage: {
    prefix: 'murradMasala_', // تمام کیز کو یہ prefix دے گا
    version: '1.0'
  },
  
  // SQLite/سرور کنفیگریشن (بعد میں استعمال کے لیے)
  serverDatabase: {
    apiUrl: '', // بعد میں بھرا جائے گا
    syncInterval: 300000 // 5 منٹ (ملی سیکنڈز میں)
  },
  
  // سیٹنگز ڈیفالٹ
  defaultSettings: {
    language: 'sd',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    businessName: 'مراد مسالا'
  }
};

// کنفیگ کو لوکل سٹوریج میں سیو/لوڈ کرنے کے لیے فنکشنز
function saveConfigToLocal() {
  localStorage.setItem(AppConfig.localStorage.prefix + 'config', JSON.stringify(AppConfig));
}

function loadConfigFromLocal() {
  const savedConfig = localStorage.getItem(AppConfig.localStorage.prefix + 'config');
  if (savedConfig) {
    return JSON.parse(savedConfig);
  }
  return AppConfig;
}

// ڈیٹابیس موڈ کو اپڈیٹ کرنے کا فنکشن
function setDatabaseMode(mode) {
  if (mode === 'local' || mode === 'server') {
    AppConfig.databaseMode = mode;
    saveConfigToLocal();
    return true;
  }
  return false;
}

// سرور کنکشن سیٹ کرنے کا فنکشن
function setServerConnection(apiUrl) {
  AppConfig.serverDatabase.apiUrl = apiUrl;
  saveConfigToLocal();
}

// موجودہ کنفیگ ایکسپورٹ کریں
export { AppConfig, loadConfigFromLocal, setDatabaseMode, setServerConnection };