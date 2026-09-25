import { HomeworkCard } from './components/HomeworkCard'
import { Section } from './components/Section'
import './App.css'

const homework = [
  {
    title: 'Створити перший React-компонент',
    course: 'React basics',
    isCompleted: true,
    score: 96,
  },
  {
    title: 'Додати типи до навчального проєкту',
    course: 'TypeScript',
    isCompleted: true,
  },
  {
    title: 'Зверстати адаптивну сторінку профілю',
    course: 'Frontend practice',
    isCompleted: false,
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
          <h1>Мої домашні<br /><em>завдання.</em></h1>
          <p className="page-intro__description">Переглядайте прогрес, оцінки та завдання, які ще потрібно здати.</p>
        </div>

        <Section title="Мої домашки">
          <div className="homework-meta">
            <span>3 завдання</span>
            <span className="legend"><i className="legend__completed" /> виконано <i className="legend__pending" /> у роботі</span>
          </div>
          <div className="homework-list">
            {homework.map((item) => <HomeworkCard key={item.title} {...item} />)}
          </div>
        </Section>
      </main>

      <footer className="site-footer">React + TypeScript <span>Опціональні пропси / 2026</span></footer>
    </div>
  )
}

export default App
