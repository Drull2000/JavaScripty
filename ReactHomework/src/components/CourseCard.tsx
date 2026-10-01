import { useState } from 'react'
import clsx from 'clsx'

interface CourseCardProps {
  title: string
  teacher: string
  credits: number
  isActive?: boolean
}

export default function CourseCard({
  title,
  teacher,
  credits,
  isActive = true,
}: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={clsx(
        'course-card',
        isActive ? 'course-card--active' : 'course-card--completed',
      )}
    >
      <h3>{title}</h3>
      <button className="course-card__toggle" type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Сховати' : 'Показати'}
      </button>
      {isOpen && (
        <div className="course-card__details">
          <p>Teacher: {teacher}</p>
          <p>Credits: {credits}</p>
          <div className="course-card__status">
            {isActive ? 'В процесі вивчення...' : 'Курс завершено'}
          </div>
        </div>
      )}
    </div>
  )
}
