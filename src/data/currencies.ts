import { Currency } from '../types/menu';

export const currencies: Currency[] = [
  {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'ريال سعودي',
    flag: '🇸🇦'
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'دولار أمريكي',
    flag: '🇺🇸'
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'يورو',
    flag: '🇪🇺'
  },
  {
    code: 'IQD',
    symbol: 'د.ع',
    name: 'دينار عراقي',
    flag: '🇮🇶'
  },
  {
    code: 'AED',
    symbol: 'د.إ',
    name: 'درهم إماراتي',
    flag: '🇦🇪'
  },
  {
    code: 'KWD',
    symbol: 'د.ك',
    name: 'دينار كويتي',
    flag: '🇰🇼'
  },
  {
    code: 'QAR',
    symbol: 'ر.ق',
    name: 'ريال قطري',
    flag: '🇶🇦'
  },
  {
    code: 'BHD',
    symbol: 'د.ب',
    name: 'دينار بحريني',
    flag: '🇧🇭'
  },
  {
    code: 'OMR',
    symbol: 'ر.ع',
    name: 'ريال عماني',
    flag: '🇴🇲'
  },
  {
    code: 'JOD',
    symbol: 'د.أ',
    name: 'دينار أردني',
    flag: '🇯🇴'
  },
  {
    code: 'LBP',
    symbol: 'ل.ل',
    name: 'ليرة لبنانية',
    flag: '🇱🇧'
  },
  {
    code: 'EGP',
    symbol: 'ج.م',
    name: 'جنيه مصري',
    flag: '🇪🇬'
  }
];

export const defaultCurrency: Currency = currencies[0]; // SAR