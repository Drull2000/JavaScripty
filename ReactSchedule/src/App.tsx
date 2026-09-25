import { LessonCard } from './components/LessonCard'
import { Section } from './components/Section'
import './App.css'

const lessons = [
  {
    topic: 'React: компоненти та props',
    date: 'Понеділок, 28 вересня · 10:00',
    isOnline: true,
    zoomLink: 'https://zoom.us/',
  },
  {
    topic: 'TypeScript у React-проєктах',
    date: 'Вівторок, 29 вересня · 14:30',
    isOnline: false,
  },
  {
    topic: 'Практика: створення інтерфейсу',
    date: 'Четвер, 1 жовтня · 11:15',
    isOnline: true,
    zoomLink: 'https://zoom.us/',
  },
  {
    topic: 'Перевірка навчального проєкту',
    date: 'Пʼятниця, 2 жовтня · 16:00',
    isOnline: false,
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">study / space</a>
        <span className="header-status"><span aria-hidden="true" /> вересень 2026</span>
      </header>

      <main>
        <div className="page-intro">
          <p className="eyebrow">Особистий кабінет студента</p>
          <h1>Найближчі<br /><em>заняття.</em></h1>
          <p className="page-intro__description">Усі важливі зустрічі та практичні заняття в одному місці.</p>
        </div>

        <Section title="Розклад">
          <div className="schedule-meta">
            <span>4 заняття</span>
            <span className="legend"><i className="legend__online" /> онлайн <i className="legend__offline" /> офлайн</span>
          </div>
          <div className="lesson-list">
            {lessons.map((lesson) => <LessonCard key={lesson.topic} {...lesson} />)}
          </div>
        </Section>
      </main>
    </div>
  )
}

export default App
