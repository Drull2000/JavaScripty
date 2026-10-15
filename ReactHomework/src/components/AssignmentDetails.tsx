import { useEffect, useState } from 'react'
import { getAssignmentById, type Assignment } from '../data/assignments'

interface AssignmentDetailsProps {
  assignmentId: string
  number: string
  onBack: () => void
}

export default function AssignmentDetails({ assignmentId, number, onBack }: AssignmentDetailsProps) {
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCurrent = true
    setAssignment(null)
    setError(null)

    getAssignmentById(assignmentId)
      .then((data) => {
        if (isCurrent) setAssignment(data)
      })
      .catch((reason: unknown) => {
        if (isCurrent) setError(reason instanceof Error ? reason.message : 'Не вдалося завантажити завдання')
      })

    return () => {
      isCurrent = false
    }
  }, [assignmentId])

  if (error) {
    return (
      <main className="homework-detail">
        <button className="back-link" type="button" onClick={onBack}>← Назад до моїх домашок</button>
        <p className="assignment-state assignment-state--error">{error}</p>
      </main>
    )
  }

  if (!assignment) {
    return (
      <main className="homework-detail">
        <button className="back-link" type="button" onClick={onBack}>← Назад до моїх домашок</button>
        <p className="assignment-state">Завантажуємо деталі завдання з бази даних...</p>
      </main>
    )
  }

  return (
    <main className="homework-detail">
      <button className="back-link" type="button" onClick={onBack}>← Назад до моїх домашок</button>
      <div className="homework-detail__hero">
        <div>
          <p className="section-label"><span>{number}</span> {assignment.course}</p>
          <h1>{assignment.title}<span>.</span></h1>
          <p className="lead">{assignment.description}</p>
        </div>
        <div className={`detail-status ${assignment.isCompleted ? 'detail-status--done' : ''}`}>
          <span>{assignment.isCompleted ? '✓' : '!'}</span>
          <strong>{assignment.isCompleted ? 'Виконано' : 'У роботі'}</strong>
          <small>Видано: {assignment.issuedAt}<br />Дедлайн: {assignment.deadline}</small>
        </div>
      </div>
      <section className="homework-detail__content">
        <div>
          <p className="section-label"><span>01</span> план роботи</p>
          <h2>Що потрібно зробити</h2>
          <ol className="homework-steps">
            {assignment.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
        <aside className="homework-detail__aside">
          <span className="eyebrow">Результат</span>
          <strong>{assignment.isCompleted ? `${assignment.score ?? '—'} / 100` : '0 / 100'}</strong>
          <p>{assignment.isCompleted ? 'Роботу вже перевірено викладачем.' : 'Після завершення прикріпіть посилання на роботу.'}</p>
          {!assignment.isCompleted && <button className="homework-card__button" type="button">Здати роботу <span aria-hidden="true">→</span></button>}
        </aside>
      </section>
    </main>
  )
}
