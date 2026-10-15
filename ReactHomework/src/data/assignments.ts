export interface Assignment {
  id: string
  title: string
  course: string
  issuedAt: string
  isCompleted: boolean
  score?: number
  deadline: string
  description: string
  steps: string[]
}

export const assignments: Assignment[] = [
  {
    id: 'assignment-react-component',
    title: 'Створити перший React-компонент',
    course: 'React basics',
    issuedAt: '10 вересня 2026',
    isCompleted: true,
    score: 96,
    deadline: '18 вересня 2026',
    description: 'Зберіть компонент картки курсу з props та окремими стилями.',
    steps: ['Створити функціональний компонент', 'Передати назву та опис через props', 'Додати адаптивні стилі'],
  },
  {
    id: 'assignment-typescript',
    title: 'Додати типи до навчального проєкту',
    course: 'TypeScript',
    issuedAt: '16 вересня 2026',
    isCompleted: true,
    deadline: '24 вересня 2026',
    description: 'Опишіть типами дані профілю студента та список курсів.',
    steps: ['Створити інтерфейс Student', 'Типізувати масив курсів', 'Прибрати неявні any'],
  },
  {
    id: 'assignment-profile',
    title: 'Зверстати адаптивну сторінку профілю',
    course: 'Frontend practice',
    issuedAt: '1 жовтня 2026',
    isCompleted: false,
    deadline: '12 жовтня 2026',
    description: 'Зробіть сторінку профілю, яка однаково добре працює на телефоні та великому екрані.',
    steps: ['Продумати структуру сторінки', 'Додати мобільну версію', 'Перевірити сторінку в браузері'],
  },
]

export function getAssignmentById(id: string): Promise<Assignment> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const assignment = assignments.find((item) => item.id === id)
      if (assignment) {
        resolve(assignment)
      } else {
        reject(new Error('Завдання не знайдено'))
      }
    }, 450)
  })
}
