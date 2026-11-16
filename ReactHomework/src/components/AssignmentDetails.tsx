import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { type Assignment, updateAssignmentStatus } from '../data/assignments'

interface AssignmentDetailsProps {
  assignment: Assignment
  number: string
  onBack: () => void
}

export default function AssignmentDetails({ assignment, number, onBack }: AssignmentDetailsProps) {
  const queryClient = useQueryClient()
  const [isCompleted, setIsCompleted] = useState(assignment.isCompleted)
  const mutation = useMutation({
    mutationFn: (completed: boolean) => updateAssignmentStatus(assignment.id, completed),
    onSuccess: (updatedAssignment) => {
      queryClient.setQueryData<Assignment[]>(['assignments'], (currentAssignments) =>
        currentAssignments?.map((item) => item.id === updatedAssignment.id
          ? { ...item, isCompleted: updatedAssignment.isCompleted }
          : item),
      )
    },
  })

  const handleComplete = () => {
    if (isCompleted || mutation.isPending) return

    setIsCompleted(true)
    mutation.mutate(true, {
      onError: () => setIsCompleted(false),
    })
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
          {mutation.error && <p className="assignment-state--error">{mutation.error.message}</p>}
          <button
            className="homework-card__button"
            type="button"
            onClick={handleComplete}
            disabled={isCompleted || mutation.isPending}
          >
            {mutation.isPending ? 'Зберігаємо...' : isCompleted ? 'Завдання виконано' : 'Виконати завдання'}
            {!isCompleted && !mutation.isPending && <span aria-hidden="true">→</span>}
          </button>
        </aside>
      </section>
    </main>
  )
}
