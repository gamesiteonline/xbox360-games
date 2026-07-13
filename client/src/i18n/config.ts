/**
 * Internationalization (i18n) Configuration
 * Supports 10+ languages with automatic detection
 */

export type Language = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' 
  | 'pt' | 'ru' | 'ja' | 'zh' | 'ar' | 'hi';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', flag: '🇮🇳' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Translation strings
 */
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Your Ultimate Game Library',
    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.guides': 'Guides',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.community': 'Community',
    'nav.settings': 'Settings',
    'button.download': 'Download',
    'button.search': 'Search',
    'button.filter': 'Filter',
    'button.signin': 'Sign In',
    'button.signup': 'Sign Up',
    'button.logout': 'Log Out',
    'label.genre': 'Genre',
    'label.rating': 'Rating',
    'label.language': 'Language',
    'label.theme': 'Theme',
    'message.welcome': 'Welcome to Gamesiteonline!',
    'message.noResults': 'No games found',
    'message.loading': 'Loading...',
    'message.error': 'An error occurred',
  },
  es: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Tu Biblioteca de Juegos Definitiva',
    'nav.home': 'Inicio',
    'nav.games': 'Juegos',
    'nav.guides': 'Guías',
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.community': 'Comunidad',
    'nav.settings': 'Configuración',
    'button.download': 'Descargar',
    'button.search': 'Buscar',
    'button.filter': 'Filtrar',
    'button.signin': 'Iniciar Sesión',
    'button.signup': 'Registrarse',
    'button.logout': 'Cerrar Sesión',
    'label.genre': 'Género',
    'label.rating': 'Calificación',
    'label.language': 'Idioma',
    'label.theme': 'Tema',
    'message.welcome': '¡Bienvenido a Gamesiteonline!',
    'message.noResults': 'No se encontraron juegos',
    'message.loading': 'Cargando...',
    'message.error': 'Ocurrió un error',
  },
  fr: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Votre Bibliothèque de Jeux Ultime',
    'nav.home': 'Accueil',
    'nav.games': 'Jeux',
    'nav.guides': 'Guides',
    'nav.dashboard': 'Tableau de Bord',
    'nav.profile': 'Profil',
    'nav.community': 'Communauté',
    'nav.settings': 'Paramètres',
    'button.download': 'Télécharger',
    'button.search': 'Rechercher',
    'button.filter': 'Filtrer',
    'button.signin': 'Se Connecter',
    'button.signup': 'S\'Inscrire',
    'button.logout': 'Se Déconnecter',
    'label.genre': 'Genre',
    'label.rating': 'Évaluation',
    'label.language': 'Langue',
    'label.theme': 'Thème',
    'message.welcome': 'Bienvenue sur Gamesiteonline!',
    'message.noResults': 'Aucun jeu trouvé',
    'message.loading': 'Chargement...',
    'message.error': 'Une erreur est survenue',
  },
  de: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Deine ultimative Spielbibliothek',
    'nav.home': 'Startseite',
    'nav.games': 'Spiele',
    'nav.guides': 'Leitfäden',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profil',
    'nav.community': 'Gemeinschaft',
    'nav.settings': 'Einstellungen',
    'button.download': 'Herunterladen',
    'button.search': 'Suchen',
    'button.filter': 'Filtern',
    'button.signin': 'Anmelden',
    'button.signup': 'Registrieren',
    'button.logout': 'Abmelden',
    'label.genre': 'Genre',
    'label.rating': 'Bewertung',
    'label.language': 'Sprache',
    'label.theme': 'Design',
    'message.welcome': 'Willkommen bei Gamesiteonline!',
    'message.noResults': 'Keine Spiele gefunden',
    'message.loading': 'Wird geladen...',
    'message.error': 'Ein Fehler ist aufgetreten',
  },
  it: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'La Tua Libreria di Giochi Definitiva',
    'nav.home': 'Home',
    'nav.games': 'Giochi',
    'nav.guides': 'Guide',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profilo',
    'nav.community': 'Comunità',
    'nav.settings': 'Impostazioni',
    'button.download': 'Scarica',
    'button.search': 'Cerca',
    'button.filter': 'Filtra',
    'button.signin': 'Accedi',
    'button.signup': 'Registrati',
    'button.logout': 'Esci',
    'label.genre': 'Genere',
    'label.rating': 'Valutazione',
    'label.language': 'Lingua',
    'label.theme': 'Tema',
    'message.welcome': 'Benvenuto su Gamesiteonline!',
    'message.noResults': 'Nessun gioco trovato',
    'message.loading': 'Caricamento...',
    'message.error': 'Si è verificato un errore',
  },
  pt: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Sua Biblioteca de Jogos Definitiva',
    'nav.home': 'Início',
    'nav.games': 'Jogos',
    'nav.guides': 'Guias',
    'nav.dashboard': 'Painel',
    'nav.profile': 'Perfil',
    'nav.community': 'Comunidade',
    'nav.settings': 'Configurações',
    'button.download': 'Baixar',
    'button.search': 'Pesquisar',
    'button.filter': 'Filtrar',
    'button.signin': 'Entrar',
    'button.signup': 'Registrar',
    'button.logout': 'Sair',
    'label.genre': 'Gênero',
    'label.rating': 'Avaliação',
    'label.language': 'Idioma',
    'label.theme': 'Tema',
    'message.welcome': 'Bem-vindo ao Gamesiteonline!',
    'message.noResults': 'Nenhum jogo encontrado',
    'message.loading': 'Carregando...',
    'message.error': 'Ocorreu um erro',
  },
  ru: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'Ваша Окончательная Библиотека Игр',
    'nav.home': 'Главная',
    'nav.games': 'Игры',
    'nav.guides': 'Руководства',
    'nav.dashboard': 'Панель',
    'nav.profile': 'Профиль',
    'nav.community': 'Сообщество',
    'nav.settings': 'Настройки',
    'button.download': 'Загрузить',
    'button.search': 'Поиск',
    'button.filter': 'Фильтр',
    'button.signin': 'Вход',
    'button.signup': 'Регистрация',
    'button.logout': 'Выход',
    'label.genre': 'Жанр',
    'label.rating': 'Рейтинг',
    'label.language': 'Язык',
    'label.theme': 'Тема',
    'message.welcome': 'Добро пожаловать на Gamesiteonline!',
    'message.noResults': 'Игры не найдены',
    'message.loading': 'Загрузка...',
    'message.error': 'Произошла ошибка',
  },
  ja: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'あなたの究極のゲームライブラリ',
    'nav.home': 'ホーム',
    'nav.games': 'ゲーム',
    'nav.guides': 'ガイド',
    'nav.dashboard': 'ダッシュボード',
    'nav.profile': 'プロフィール',
    'nav.community': 'コミュニティ',
    'nav.settings': '設定',
    'button.download': 'ダウンロード',
    'button.search': '検索',
    'button.filter': 'フィルター',
    'button.signin': 'サインイン',
    'button.signup': 'サインアップ',
    'button.logout': 'ログアウト',
    'label.genre': 'ジャンル',
    'label.rating': '評価',
    'label.language': '言語',
    'label.theme': 'テーマ',
    'message.welcome': 'Gamesiteonlineへようこそ!',
    'message.noResults': 'ゲームが見つかりません',
    'message.loading': '読み込み中...',
    'message.error': 'エラーが発生しました',
  },
  zh: {
    'app.title': 'Gamesiteonline',
    'app.tagline': '您的终极游戏库',
    'nav.home': '首页',
    'nav.games': '游戏',
    'nav.guides': '指南',
    'nav.dashboard': '仪表板',
    'nav.profile': '个人资料',
    'nav.community': '社区',
    'nav.settings': '设置',
    'button.download': '下载',
    'button.search': '搜索',
    'button.filter': '筛选',
    'button.signin': '登录',
    'button.signup': '注册',
    'button.logout': '登出',
    'label.genre': '类型',
    'label.rating': '评分',
    'label.language': '语言',
    'label.theme': '主题',
    'message.welcome': '欢迎来到Gamesiteonline!',
    'message.noResults': '未找到游戏',
    'message.loading': '加载中...',
    'message.error': '发生错误',
  },
  ar: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'مكتبة الألعاب النهائية الخاصة بك',
    'nav.home': 'الرئيسية',
    'nav.games': 'الألعاب',
    'nav.guides': 'الأدلة',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.community': 'المجتمع',
    'nav.settings': 'الإعدادات',
    'button.download': 'تحميل',
    'button.search': 'بحث',
    'button.filter': 'تصفية',
    'button.signin': 'تسجيل الدخول',
    'button.signup': 'إنشاء حساب',
    'button.logout': 'تسجيل الخروج',
    'label.genre': 'النوع',
    'label.rating': 'التقييم',
    'label.language': 'اللغة',
    'label.theme': 'المظهر',
    'message.welcome': 'مرحبا بك في Gamesiteonline!',
    'message.noResults': 'لم يتم العثور على ألعاب',
    'message.loading': 'جاري التحميل...',
    'message.error': 'حدث خطأ',
  },
  hi: {
    'app.title': 'Gamesiteonline',
    'app.tagline': 'आपकी अंतिम गेम लाइब्रेरी',
    'nav.home': 'होम',
    'nav.games': 'गेम्स',
    'nav.guides': 'गाइड',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'nav.community': 'समुदाय',
    'nav.settings': 'सेटिंग्स',
    'button.download': 'डाउनलोड',
    'button.search': 'खोज',
    'button.filter': 'फ़िल्टर',
    'button.signin': 'साइन इन करें',
    'button.signup': 'साइन अप करें',
    'button.logout': 'लॉग आउट',
    'label.genre': 'शैली',
    'label.rating': 'रेटिंग',
    'label.language': 'भाषा',
    'label.theme': 'थीम',
    'message.welcome': 'Gamesiteonline में आपका स्वागत है!',
    'message.noResults': 'कोई गेम नहीं मिला',
    'message.loading': 'लोड हो रहा है...',
    'message.error': 'एक त्रुटि हुई',
  },
};

/**
 * Get translation
 */
export function t(key: string, language: Language = DEFAULT_LANGUAGE): string {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;
}

/**
 * Detect user language
 */
export function detectLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;

  const browserLang = navigator.language.split('-')[0] as Language;
  return SUPPORTED_LANGUAGES.some(l => l.code === browserLang)
    ? browserLang
    : DEFAULT_LANGUAGE;
}

/**
 * Format date by language
 */
export function formatDate(date: Date, language: Language): string {
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : language).format(date);
}

/**
 * Format number by language
 */
export function formatNumber(num: number, language: Language): string {
  return new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : language).format(num);
}

/**
 * Format currency by language
 */
export function formatCurrency(amount: number, currency: string, language: Language): string {
  return new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : language, {
    style: 'currency',
    currency,
  }).format(amount);
}
