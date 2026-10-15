import { clsx } from 'clsx'

interface HomeworkCardProps {
  title: string
  course: string
  isCompleted: boolean
  score?: number
  deadline?: string
  issuedAt?: string
  onOpen?: () => void
}

export function HomeworkCard({ title, course, isCompleted, score, deadline, issuedAt, onOpen }: HomeworkCardProps) {
  return (
    <article
      className={clsx('homework-card', isCompleted ? 'homework-card--completed' : 'homework-card--pending')}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onOpen?.()
      }}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      <div className="homework-card__number" aria-hidden="true">
        {isCompleted ? '✓' : '!'}
      </div>
      <div className="homework-card__body">
        <span className="homework-card__course">{course}</span>
        <h3>{title}</h3>
        {issuedAt && <span className="homework-card__deadline">Видано {issuedAt}</span>}
        {deadline && <span className="homework-card__deadline">До {deadline}</span>}
        {isCompleted ? (
          <div className="homework-card__actions">
            <p className="homework-card__status">
            {score !== undefined ? `Оцінка: ${score}/100` : 'Очікує перевірки...'}
            </p>
            {onOpen && <button className="homework-card__button" type="button" onClick={(event) => { event.stopPropagation(); onOpen() }}>Відкрити <span aria-hidden="true">→</span></button>}
          </div>
        ) : (
          <button className="homework-card__button" type="button" onClick={(event) => { event.stopPropagation(); onOpen?.() }}>
            Здати роботу <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </article>
  )
}