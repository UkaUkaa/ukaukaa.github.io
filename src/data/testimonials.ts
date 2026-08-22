/**
 * Client reviews — copied from the public Freelancehunt profile
 * (https://freelancehunt.com/freelancer/H3210.html#reviews).
 * `original` marks the language the review was written in; the other two are translations.
 */
import type { Locale } from '../i18n/types';

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  original: Locale;
  text: Record<Locale, string>;
}

export const testimonialsSource = {
  label: 'Freelancehunt',
  href: 'https://freelancehunt.com/freelancer/H3210.html#reviews',
  total: 9,
  average: 5.0,
  successRate: 100,
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 'r-01', author: 'Михаил Кондрацкий', rating: 5, original: 'ru',
    text: {
      ru: 'Заказывал бота. Быстро и со всем нужным функционалом! Я остался доволен на 10/10',
      uk: 'Замовляв бота. Швидко і з усім потрібним функціоналом! Я задоволений на 10/10',
      en: 'Ordered a bot. Fast, and with all the functionality I needed! Satisfied 10/10.',
    },
  },
  {
    id: 'r-02', author: 'Ruslan Voytovych', rating: 5, original: 'uk',
    text: {
      uk: 'Роботу виконано швидше заявленого, чудовий контакт, рішення має більший функціонал ніж описував в ТЗ. Дякую і рекомендую!',
      ru: 'Работа выполнена быстрее заявленного, отличный контакт, решение имеет больший функционал, чем я описывал в ТЗ. Спасибо и рекомендую!',
      en: 'The work was delivered ahead of schedule, great communication, and the solution has more functionality than I described in the brief. Thank you — highly recommended!',
    },
  },
  {
    id: 'r-03', author: 'Владимир Шишковский', rating: 5, original: 'ru',
    text: {
      ru: 'Выполнил всё четко и хорошо, очень креативно подошел к задаче, коммуникация супер!',
      uk: 'Виконав усе чітко і добре, дуже креативно підійшов до задачі, комунікація супер!',
      en: 'Did everything precisely and well, took a very creative approach to the task, communication was superb!',
    },
  },
  {
    id: 'r-04', author: 'Андрій Миколенко', rating: 5, original: 'uk',
    text: {
      uk: 'Все було виконано швидко на чітко по тз',
      ru: 'Всё было выполнено быстро и чётко по ТЗ',
      en: 'Everything was done quickly and exactly according to the brief.',
    },
  },
  {
    id: 'r-05', author: 'Artem Krol', rating: 5, original: 'ru',
    text: {
      ru: 'Сделано все хорошо и быстро. Одень понравилось работать с исполнителем. Надеюсь на дальнейшее сотрудничество.',
      uk: 'Зроблено все добре і швидко. Дуже сподобалося працювати з виконавцем. Сподіваюся на подальшу співпрацю.',
      en: 'Everything was done well and quickly. Really enjoyed working with him. Looking forward to working together again.',
    },
  },
  {
    id: 'r-06', author: 'Олег Исаев', rating: 5, original: 'ru',
    text: {
      ru: 'Всё отлично, надеюсь на дальнейшее сотрудничество',
      uk: 'Все чудово, сподіваюся на подальшу співпрацю',
      en: 'Everything was excellent, hoping to work together again.',
    },
  },
  {
    id: 'r-07', author: 'Влад Заславский', rating: 5, original: 'ru',
    text: {
      ru: 'Все супер! оперативно выполнил поставленную задачу - потратил свое время и все обьяснил. Крутой спец - будем работать!',
      uk: 'Все супер! Оперативно виконав поставлену задачу — витратив свій час і все пояснив. Крутий спеціаліст — будемо працювати!',
      en: 'Everything was great! Completed the task promptly, took the time to explain everything. A top specialist — we will keep working together!',
    },
  },
  {
    id: 'r-08', author: 'Евгений Боровик', rating: 5, original: 'ru',
    text: {
      ru: 'Отличный специалсит, все выполнено грамотно. Рекомендую.',
      uk: 'Чудовий спеціаліст, усе виконано грамотно. Рекомендую.',
      en: 'Excellent specialist, everything done properly. Recommended.',
    },
  },
  {
    id: 'r-09', author: 'Дмитрий Туркин', rating: 5, original: 'ru',
    text: {
      ru: 'Отличная работа! Все в срок, тут же отработали все глюки. Фрилансера рекомендую',
      uk: 'Чудова робота! Все вчасно, одразу виправили всі баги. Фрілансера рекомендую',
      en: 'Great work! Everything on time, and all the glitches were fixed right away. I recommend this freelancer.',
    },
  },
];
