/**
 * Client reviews — copied from the public Freelancehunt profile
 * (https://freelancehunt.com/freelancer/H3210.html#reviews).
 * Reviews were written in Russian or Ukrainian; shown here in Ukrainian and English.
 */
import type { Locale } from '../i18n/types';

export interface Testimonial {
  id: string;
  author: Record<Locale, string>;
  rating: number;
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
    id: 'r-01', author: { uk: 'Михайло Кондрацький', en: 'Mykhailo Kondratskyi' }, rating: 5,
    text: {
      uk: 'Замовляв бота. Швидко і з усім потрібним функціоналом! Я задоволений на 10/10',
      en: 'Ordered a bot. Fast, and with all the functionality I needed! Satisfied 10/10.',
    },
  },
  {
    id: 'r-02', author: { uk: 'Руслан Войтович', en: 'Ruslan Voytovych' }, rating: 5,
    text: {
      uk: 'Роботу виконано швидше заявленого, чудовий контакт, рішення має більший функціонал ніж описував в ТЗ. Дякую і рекомендую!',
      en: 'The work was delivered ahead of schedule, great communication, and the solution has more functionality than I described in the brief. Thank you — highly recommended!',
    },
  },
  {
    id: 'r-03', author: { uk: 'Володимир Шишковський', en: 'Volodymyr Shyshkovskyi' }, rating: 5,
    text: {
      uk: 'Виконав усе чітко і добре, дуже креативно підійшов до задачі, комунікація супер!',
      en: 'Did everything precisely and well, took a very creative approach to the task, communication was superb!',
    },
  },
  {
    id: 'r-04', author: { uk: 'Андрій Миколенко', en: 'Andrii Mykolenko' }, rating: 5,
    text: {
      uk: 'Все було виконано швидко на чітко по тз',
      en: 'Everything was done quickly and exactly according to the brief.',
    },
  },
  {
    id: 'r-05', author: { uk: 'Артем Кроль', en: 'Artem Krol' }, rating: 5,
    text: {
      uk: 'Зроблено все добре і швидко. Дуже сподобалося працювати з виконавцем. Сподіваюся на подальшу співпрацю.',
      en: 'Everything was done well and quickly. Really enjoyed working with him. Looking forward to working together again.',
    },
  },
  {
    id: 'r-06', author: { uk: 'Олег Ісаєв', en: 'Oleh Isaiev' }, rating: 5,
    text: {
      uk: 'Все чудово, сподіваюся на подальшу співпрацю',
      en: 'Everything was excellent, hoping to work together again.',
    },
  },
  {
    id: 'r-07', author: { uk: 'Влад Заславський', en: 'Vlad Zaslavskyi' }, rating: 5,
    text: {
      uk: 'Все супер! Оперативно виконав поставлену задачу — витратив свій час і все пояснив. Крутий спеціаліст — будемо працювати!',
      en: 'Everything was great! Completed the task promptly, took the time to explain everything. A top specialist — we will keep working together!',
    },
  },
  {
    id: 'r-08', author: { uk: 'Євген Боровик', en: 'Yevhen Borovyk' }, rating: 5,
    text: {
      uk: 'Чудовий спеціаліст, усе виконано грамотно. Рекомендую.',
      en: 'Excellent specialist, everything done properly. Recommended.',
    },
  },
  {
    id: 'r-09', author: { uk: 'Дмитро Туркін', en: 'Dmytro Turkin' }, rating: 5,
    text: {
      uk: 'Чудова робота! Все вчасно, одразу виправили всі баги. Фрілансера рекомендую',
      en: 'Great work! Everything on time, and all the glitches were fixed right away. I recommend this freelancer.',
    },
  },
];
