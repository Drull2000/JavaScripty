import { clsx } from 'clsx'

interface LessonCardProps {
  topic: string
  date: string
  isOnline: boolean
  zoomLink?: string
}

export function LessonCard({ topic, date, isOnline, zoomLink }: LessonCardProps) {
  return (
    <article className={clsx('lesson-card', isOnline ? 'lesson-card--online' : 'lesson-card--offline')}>
      <div className="lesson-card__marker" aria-hidden="true">
        {isOnline ? '↗' : '⌂'}
      </div>
      <div className="lesson-card__content">
        <span className="lesson-card__type">{isOnline ? 'Онлайн заняття' : 'Офлайн заняття'}</span>
        <h3>{topic}</h3>
        <time>{date}</time>
        {isOnline && zoomLink && (
          <a className="lesson-card__button" href={zoomLink} target="_blank" rel="noreferrer">
            Підключитися до Zoom <span aria-hidden="true">→</span>
          </a>
        )}
        {!isOnline && <p className="lesson-card__notice">Аудиторія 404. Не забудьте ноутбук!</p>}
      </div>
    </article>
  )
}