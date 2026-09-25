import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="schedule-section" aria-labelledby="schedule-title">
      <div className="schedule-section__heading">
        <p className="eyebrow">Навчальний тиждень / 01</p>
        <h2 id="schedule-title">{title}</h2>
      </div>
      <div className="schedule-section__content">{children}</div>
    </section>
  )
}