import { useState } from 'react'
import { executeAssignment, getAssignmentResource } from '../data/assignments'

interface AssignmentDetailsProps {
  assignmentId: string
  number: string
  onBack: () => void
}

export default function AssignmentDetails({ assignmentId, number, onBack }: AssignmentDetailsProps) {
  const assignment = getAssignmentResource(assignmentId).read()
  const [isCompleted, setIsCompleted] = useState(assignment.isCompleted)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleComplete = () => {
    if (isCompleted || isSubmitting) return

    setError(null)
    setIsCompleted(true)
    setIsSubmitting(true)

    executeAssignment(assignmentId)
      .catch((reason: unknown) => {
        setIsCompleted(false)
        setError(reason instanceof Error ? reason.message : 'Не вдалося виконати завдання')
      })
      .finally(() => setIsSubmitting(false))
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
        <div className={`detail-status ${isCompleted ? 'detail-status--done' : ''}`}>
          <span>{isCompleted ? '✓' : '!'}</span>
          <strong>{isCompleted ? 'Виконано' : 'У роботі'}</strong>
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
          <strong>{isCompleted ? `${assignment.score ?? '—'} / 100` : '0 / 100'}</strong>
          <p>{isCompleted ? 'Завдання виконано та збережено.' : 'Після виконання результат буде збережено.'}</p>
          {error && <p className="assignment-state--error">{error}</p>}
          <button
            className="homework-card__button"
            type="button"
            onClick={handleComplete}
            disabled={isCompleted || isSubmitting}
          >
            {isSubmitting ? 'Зберігаємо...' : isCompleted ? 'Завдання виконано' : 'Виконати завдання'}
            {!isCompleted && !isSubmitting && <span aria-hidden="true">→</span>}
          </button>
        </aside>
      </section>
    </main>
  )
}
