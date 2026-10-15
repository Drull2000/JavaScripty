import { useState } from 'react'
import clsx from 'clsx'

interface CourseCardProps {
  title: string
  teacher: string
  credits: number
  description?: string
  isActive?: boolean
  isSelected?: boolean
  onSelect?: () => void
}

export default function CourseCard({
  title,
  teacher,
  credits,
  description,
  isActive = true,
  isSelected = false,
  onSelect,
}: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article
      className={clsx(
        'course-card',
        isActive ? 'course-card--active' : 'course-card--completed',
        isSelected && 'course-card--selected',
      )}
    >
      <h3>{title}</h3>
      {description && <p className="course-card__description">{description}</p>}
      <button className="course-card__toggle" type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Сховати' : 'Показати'}
      </button>
      {isOpen && (
        <div className="course-card__details">
          <p>Викладач: {teacher}</p>
          <p>Кредити: {credits}</p>
          <div className="course-card__status">
            {isActive ? 'В процесі вивчення...' : 'Курс завершено'}
          </div>
        </div>
      )}
      {onSelect && (
        <button className="course-card__select" type="button" onClick={onSelect}>
          Обрати курс <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  )
}
