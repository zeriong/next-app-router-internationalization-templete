import { Locale, i18nConfig } from '@/libs/i18n';

// 지정된 locale에 대한 번역 json 파일을 비동기적으로 실행시키는 기능 포함
const translations = {
  en: () => import('@/public/locales/en.json').then((module) => module.default),
  ko: () => import('@/public/locales/ko.json').then((module) => module.default),
};

// 번역 객체 타입 정의
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;
// 번역 객체의 키, 벨류에 대한 타입 정의
export type KeyOfTranslation = keyof Translation;
export type ValueOfTranslation = Translation[KeyOfTranslation];

/**
 * 지정된 로케일을 기반으로 번역 json 파일을 비동기적으로 로드
 * @param locale locale 문자열
 * @returns 번역 객체의 key, value 쌍(pair)
 */
export default async function loadTranslation(
  locale: Locale,
): Promise<Translation> {
  // 지정된 로케일 키에 해당하는 번역에 대한 호출을 호출합니다.
  return translations[locale]();
}
