import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="homework-section" aria-labelledby="homework-title">
      <div className="homework-section__heading">
        <p className="eyebrow">Навчальний кабінет / 02</p>
        <h2 id="homework-title">{title}</h2>
      </div>
      <div className="homework-section__content">{children}</div>
    </section>
  )
}