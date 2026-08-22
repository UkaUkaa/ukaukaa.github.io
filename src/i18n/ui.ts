import type { Locale, UiStrings } from './types';

export const ui: Record<Locale, UiStrings> = {
  en: {
    meta: {
      title: 'Alexandr Filinskyi — Software Engineer',
      description: 'Alexandr Filinskyi is a software engineer building software, automation and digital products. Selected work, stack, experience and contact.',
    },
    nav: { work: 'Work', about: 'About', stack: 'Stack', testimonials: 'Reviews', contact: 'Contact', skip: 'Skip to content', openMenu: 'Open menu', closeMenu: 'Close menu', backToTop: 'Back to top', language: 'Language' },
    hero: { scroll: 'Scroll', intro: 'Introduction' },
    sections: {
      work: { label: 'Selected Work', title: 'Projects that show how I think and build.', addHint: 'Add projects in', viewProject: 'View project', liveDemo: 'Live Demo', github: 'GitHub', technologies: 'Technologies', imagePlaceholder: 'image placeholder', addImage: 'Add project image' },
      about: { label: 'About', title: 'Who is behind the work.', specialties: 'Specialties' },
      stack: { label: 'Stack', title: 'Tools I reach for, grouped by what they are for.' },
      experience: { label: 'Experience', title: 'Where the work has taken me.' },
      testimonials: { label: 'Reviews', title: 'What clients say after the work is done.', reviews: 'reviews', average: 'average rating', success: 'successful projects', viewAll: 'All reviews on', rating: 'Rating' },
      contact: { label: 'Contact' },
    },
    cursor: { view: 'View' },
  },

  uk: {
    meta: {
      title: 'Олександр Філінський — Software Engineer',
      description: 'Олександр Філінський — інженер-програміст, що створює програмне забезпечення, автоматизацію та цифрові продукти. Проєкти, стек, досвід і контакти.',
    },
    nav: { work: 'Проєкти', about: 'Про мене', stack: 'Стек', testimonials: 'Відгуки', contact: 'Контакти', skip: 'Перейти до контенту', openMenu: 'Відкрити меню', closeMenu: 'Закрити меню', backToTop: 'Нагору', language: 'Мова' },
    hero: { scroll: 'Гортати', intro: 'Вступ' },
    sections: {
      work: { label: 'Вибрані проєкти', title: 'Проєкти, що показують, як я думаю та будую.', addHint: 'Додайте проєкти у', viewProject: 'Переглянути', liveDemo: 'Демо', github: 'GitHub', technologies: 'Технології', imagePlaceholder: 'зображення-заглушка', addImage: 'Додати зображення проєкту' },
      about: { label: 'Про мене', title: 'Хто стоїть за роботою.', specialties: 'Спеціалізація' },
      stack: { label: 'Стек', title: 'Інструменти, які я використовую, згруповані за призначенням.' },
      experience: { label: 'Досвід', title: 'Куди мене привела робота.' },
      testimonials: { label: 'Відгуки', title: 'Що кажуть клієнти після завершення роботи.', reviews: 'відгуків', average: 'середня оцінка', success: 'успішних проєктів', viewAll: 'Усі відгуки на', rating: 'Оцінка' },
      contact: { label: 'Контакти' },
    },
    cursor: { view: 'Відкрити' },
  },

  ru: {
    meta: {
      title: 'Александр Филинский — Software Engineer',
      description: 'Александр Филинский — инженер-программист, создающий программное обеспечение, автоматизацию и цифровые продукты. Проекты, стек, опыт и контакты.',
    },
    nav: { work: 'Проекты', about: 'Обо мне', stack: 'Стек', testimonials: 'Отзывы', contact: 'Контакты', skip: 'Перейти к содержимому', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню', backToTop: 'Наверх', language: 'Язык' },
    hero: { scroll: 'Листать', intro: 'Вступление' },
    sections: {
      work: { label: 'Избранные проекты', title: 'Проекты, которые показывают, как я думаю и строю.', addHint: 'Добавьте проекты в', viewProject: 'Открыть проект', liveDemo: 'Демо', github: 'GitHub', technologies: 'Технологии', imagePlaceholder: 'изображение-заглушка', addImage: 'Добавить изображение проекта' },
      about: { label: 'Обо мне', title: 'Кто стоит за работой.', specialties: 'Специализация' },
      stack: { label: 'Стек', title: 'Инструменты, которые я использую, сгруппированные по назначению.' },
      experience: { label: 'Опыт', title: 'Куда меня привела работа.' },
      testimonials: { label: 'Отзывы', title: 'Что говорят клиенты после завершения работы.', reviews: 'отзывов', average: 'средняя оценка', success: 'успешных проектов', viewAll: 'Все отзывы на', rating: 'Оценка' },
      contact: { label: 'Контакты' },
    },
    cursor: { view: 'Открыть' },
  },
};
