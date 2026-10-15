export interface Module {
  name: string
  isCompleted: boolean
}

export interface CourseDetails {
  id: string
  title: string
  description: string
  teacher: string
  modules: Module[]
  completedModules: number
}

export const courseDetailsData: CourseDetails[] = [
  {
    id: 'c1',
    title: 'Основи HTML та CSS',
    description: 'Фундаментальний курс з верстки веб-сторінок: семантичний HTML, Flexbox, Grid та адаптивний дизайн.',
    teacher: 'Олексій Іванов',
    modules: [
      { name: 'Вступ до веб-технологій', isCompleted: true },
      { name: 'Семантична розмітка HTML5', isCompleted: true },
      { name: 'Основи стилізації', isCompleted: true },
      { name: 'Системи розкладки: Flexbox та Grid', isCompleted: true },
      { name: 'Адаптивний та мобільний дизайн', isCompleted: true },
    ],
    completedModules: 5,
  },
  {
    id: 'c2',
    title: 'JavaScript Advanced',
    description: 'Замикання, прототипи, event loop та асинхронне програмування в сучасному JavaScript.',
    teacher: 'Марія Коваленко',
    modules: [
      { name: 'Просунута робота з функціями', isCompleted: true },
      { name: "Об'єктно-орієнтований JS", isCompleted: true },
      { name: 'Асинхронність та Event Loop', isCompleted: true },
      { name: 'Робота з мережею (Fetch API)', isCompleted: true },
      { name: 'Маніпуляції з DOM-деревом', isCompleted: true },
    ],
    completedModules: 5,
  },
  {
    id: 'c3',
    title: 'React Frontend',
    description: 'Компонентний підхід, хуки, управління станом та життєвий цикл інтерактивних інтерфейсів.',
    teacher: 'Володимир Юркевич',
    modules: [
      { name: 'Вступ до JSX та компонентів', isCompleted: true },
      { name: 'Локальний стан та props', isCompleted: true },
      { name: 'Побічні ефекти (useEffect)', isCompleted: false },
      { name: 'Робота з формами', isCompleted: false },
      { name: 'Маршрутизація', isCompleted: false },
    ],
    completedModules: 2,
  },
  {
    id: 'c4',
    title: 'Програмування на C++',
    description: 'Від базових конструкцій до памʼяті, вказівників, шаблонів та контейнерів STL.',
    teacher: 'Володимир Юркевич',
    modules: [
      { name: 'Базовий синтаксис та типи даних', isCompleted: false },
      { name: 'Вказівники та динамічна памʼять', isCompleted: false },
      { name: 'Обʼєктно-орієнтоване програмування', isCompleted: false },
      { name: 'Шаблони класів та функцій', isCompleted: false },
      { name: 'Алгоритми та структури даних STL', isCompleted: false },
    ],
    completedModules: 0,
  },
  {
    id: 'c5',
    title: 'Fullstack на Next.js',
    description: 'Серверні компоненти, App Router, база даних, автентифікація та деплой повноцінних застосунків.',
    teacher: 'Макс',
    modules: [
      { name: 'Архітектура Next.js (App Router)', isCompleted: true },
      { name: 'Серверні та клієнтські компоненти', isCompleted: true },
      { name: 'Інтеграція з базою даних', isCompleted: true },
      { name: 'Аутентифікація користувачів', isCompleted: false },
      { name: 'Деплой та оптимізація продуктивності', isCompleted: false },
    ],
    completedModules: 3,
  },
]
