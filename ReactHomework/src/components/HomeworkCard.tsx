import { clsx } from 'clsx'

interface HomeworkCardProps {
  title: string
  course: string
  isCompleted: boolean
  score?: number
}

export function HomeworkCard({ title, course, isCompleted, score }: HomeworkCardProps) {
  return (
    <article className={clsx('homework-card', isCompleted ? 'homework-card--completed' : 'homework-card--pending')}>
      <div className="homework-card__number" aria-hidden="true">
        {isCompleted ? '✓' : '!'}
      </div>
      <div className="homework-card__body">
        <span className="homework-card__course">{course}</span>
        <h3>{title}</h3>
        {isCompleted ? (
          <p className="homework-card__status">
            {score !== undefined ? `Оцінка: ${score}/100` : 'Очікує перевірки...'}
          </p>
        ) : (
          <button className="homework-card__button" type="button">
            Здати роботу <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </article>
  )
}