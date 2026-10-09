import { useCallback, useRef, useState, useEffect, type ReactNode } from 'react'
import CourseCard from './components/CourseCard'
import { Header } from './components/Header'
import { HomeworkCard } from './components/HomeworkCard'
import CourseProgress, { type CourseType } from './components/CourseProgress'
import ProfileEditor from './components/ProfileEditor'
import { Section } from './components/Section'
import { StudentProfile } from './components/StudentProfile'
import './App.css'
import FocusTimer from './components/FocusTimer'
import StudyReminder from './components/StudyReminder'
import { Toaster } from 'react-hot-toast'
import StudyLogs, { type AddStudyLog } from './components/StudyLogs'

const homework = [
  { title: 'Створити перший React-компонент', course: 'React basics', isCompleted: true, score: 96, deadline: '18 вересня 2026', description: 'Зберіть компонент картки курсу з props та окремими стилями.', steps: ['Створити функціональний компонент', 'Передати назву та опис через props', 'Додати адаптивні стилі'] },
  { title: 'Додати типи до навчального проєкту', course: 'TypeScript', isCompleted: true, deadline: '24 вересня 2026', description: 'Опишіть типами дані профілю студента та список курсів.', steps: ['Створити інтерфейс Student', 'Типізувати масив курсів', 'Прибрати неявні any'] },
  { title: 'Зверстати адаптивну сторінку профілю', course: 'Frontend practice', isCompleted: false, deadline: '12 жовтня 2026', description: 'Зробіть сторінку профілю, яка однаково добре працює на телефоні та великому екрані.', steps: ['Продумати структуру сторінки', 'Додати мобільну версію', 'Перевірити сторінку в браузері'] },
]

const initialCourses: CourseType[] = [
  { id: '1', title: 'React basics', completedLessons: 0, totalLessons: 12, teacher: 'Олексій Іванов', credits: 4 },
  { id: '2', title: 'TypeScript', completedLessons: 0, totalLessons: 12, teacher: 'Марія Петрова', credits: 3 },
  { id: '3', title: 'Frontend practice', completedLessons: 0, totalLessons: 12, teacher: 'Дмитро Сидоров', credits: 5 },
]

const lessons = [
  { topic: 'React: компоненти та props', date: 'Понеділок, 28 вересня · 10:00', isOnline: true, zoomLink: 'https://zoom.us/' },
  { topic: 'TypeScript у React-проєктах', date: 'Вівторок, 29 вересня · 14:30', isOnline: false },
  { topic: 'Практика: створення інтерфейсу', date: 'Четвер, 1 жовтня · 11:15', isOnline: true, zoomLink: 'https://zoom.us/' },
  { topic: 'Перевірка навчального проєкту', date: 'Пʼятниця, 2 жовтня · 16:00', isOnline: false },
]

const cityPhotos = [
  { title: 'Софійський собор', description: 'Одна з найвідоміших памʼяток Києва та України.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/P1030616-1.JPG?width=900' },
  { title: 'Андріївський узвіз', description: 'Історична вулиця, де мистецтво зустрічається з міським життям.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Andriyivskyi%20Descent%20in%20Kyiv%2C%202006.jpg?width=900' },
  { title: 'Дніпро та набережна', description: 'Місце для довгих прогулянок і спостереження за ритмом міста.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kyiv%20Dnieper.jpg?width=900' },
]

const bookReviews = [
  { author: 'Марія, студентка', rating: '★★★★★', text: 'Книга захоплює з перших сторінок і дуже живо передає атмосферу української природи.' },
  { author: 'Олег, читач', rating: '★★★★☆', text: 'Сильна історія про свободу, гідність і людей, які не відмовляються від себе.' },
  { author: 'Анна, книжковий клуб', rating: '★★★★★', text: 'Після прочитання хочеться обговорювати героїв і ще раз перечитати улюблені епізоди.' },
]

function LessonCard({ topic, date, isOnline, zoomLink }: typeof lessons[number]) {
  return (
    <article className={`lesson-card ${isOnline ? 'lesson-card--online' : 'lesson-card--offline'}`}>
      <div className="lesson-card__marker" aria-hidden="true">{isOnline ? '↗' : '⌂'}</div>
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

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span>{number}</span> {children}</p>
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div className="info-item"><dt>{label}</dt><dd>{value}</dd></div>
}

function PhotoCard({ title, description, image }: typeof cityPhotos[number]) {
  return (
    <article className="photo-card">
      <img src={image} alt={title} />
      <div className="photo-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

function ReviewCard({ author, rating, text }: typeof bookReviews[number]) {
  return (
    <article className="review-card">
      <div className="review-card__top">
        <span className="rating">{rating}</span>
        <span className="review-author">{author}</span>
      </div>
      <p>“{text}”</p>
    </article>
  )
}

function CityTask() {
  return (
    <main className="content-grid">
      <section className="intro-panel">
        <SectionLabel number="01">місто, яке я люблю</SectionLabel>
        <h1>Київ<span>.</span></h1>
        <p className="lead">Столиця України, у якій давня історія поєднується з енергією сучасного міста.</p>
        <dl className="facts-list">
          <InfoItem label="Країна" value="Україна" />
          <InfoItem label="Рік заснування" value="482 рік" />
          <InfoItem label="Річка" value="Дніпро" />
        </dl>
      </section>
      <section className="details-panel">
        <div className="section-heading">
          <div>
            <SectionLabel number="02">місця з характером</SectionLabel>
            <h2>Куди варто завітати</h2>
          </div>
          <span className="section-count">03 / фото</span>
        </div>
        <div className="photo-grid">
          {cityPhotos.map((photo) => (
            <PhotoCard key={photo.title} {...photo} />
          ))}
        </div>
      </section>
    </main>
  )
}

function BookTask() {
  return (
    <main className="book-layout">
      <section className="book-intro">
        <SectionLabel number="01">книга, до якої повертаюсь</SectionLabel>
        <div className="book-cover" aria-hidden="true">
          <span>Тигролови</span>
          <small>Іван Багряний</small>
        </div>
        <div className="book-title">
          <h1>Тигролови<span>.</span></h1>
          <p>Іван Багряний</p>
        </div>
      </section>
      <section className="book-details">
        <div className="book-description">
          <SectionLabel number="02">чому саме вона</SectionLabel>
          <h2>Історія про свободу, яка не старіє</h2>
          <p>
            Роман розповідає про Григорій Многогрішного, який тікає від переслідувань і знаходить нове життя серед українців Зеленого Клину. Це динамічна книга про сміливість, кохання та право людини залишатися собою.
          </p>
          <dl className="book-facts">
            <InfoItem label="Жанр" value="Пригодницький роман" />
            <InfoItem label="Обсяг" value="256 сторінок" />
            <InfoItem label="Мова видання" value="Українська" />
          </dl>
        </div>
        <div className="reviews-block">
          <div className="section-heading">
            <div>
              <SectionLabel number="03">думки читачів</SectionLabel>
              <h2>Рецензії</h2>
            </div>
            <span className="section-count">03 / відгуки</span>
          </div>
          <div className="reviews-list">
            {bookReviews.map((review) => (
              <ReviewCard key={review.author} {...review} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [view, setView] = useState<'homework' | 'homework-detail' | 'schedule' | 'tasks'>('homework')
  const [task, setTask] = useState<'city' | 'book'>('city')
  const [selectedHomework, setSelectedHomework] = useState(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const studyLogAdderRef = useRef<AddStudyLog | null>(null)

  const [courses, setCourses] = useState<CourseType[]>(() => {
    const saved = localStorage.getItem('app_courses_data')
    return saved ? JSON.parse(saved) : initialCourses
  })

  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    return localStorage.getItem('selectedCourseId') || '1'
  })

  useEffect(() => {
    localStorage.setItem('app_courses_data', JSON.stringify(courses))
  }, [courses])

  useEffect(() => {
    localStorage.setItem('selectedCourseId', selectedCourseId)
  }, [selectedCourseId])

  const [userProfile, setUserProfile] = useState({
    name: 'Владислав',
    group: 'P-410',
    isOnline: true,
  })

  const filteredCourses = courses.filter((course: CourseType) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeCourse = courses.find((c: CourseType) => c.id === selectedCourseId) || courses[0]

  const registerStudyLogs = useCallback((addLog: AddStudyLog) => {
    studyLogAdderRef.current = addLog
  }, [])

  const handleCompleteLesson = () => {
    const lessonNumber = activeCourse.completedLessons + 1
    studyLogAdderRef.current?.(activeCourse.title, lessonNumber)
    setCourses((prevCourses: CourseType[]) =>
      prevCourses.map((c: CourseType) =>
        c.id === selectedCourseId && c.completedLessons < c.totalLessons
          ? { ...c, completedLessons: c.completedLessons + 1 }
          : c
      )
    )
  }

  const handleResetProgress = () => {
    setCourses((prevCourses: CourseType[]) =>
      prevCourses.map((c: CourseType) =>
        c.id === selectedCourseId ? { ...c, completedLessons: 0 } : c
      )
    )
  }

  const handleTransfer = () => {
    setUserProfile((profile) => ({ ...profile, isOnline: !profile.isOnline }))
  }

  const isTasks = view === 'tasks'
  const isHomeworkView = view === 'homework' || view === 'homework-detail'
  const selectedHomeworkItem = homework[selectedHomework]

  return (
    <div className={`app-shell ${isTasks ? 'tasks-shell' : ''}`}>
      <Toaster position="top-right" toastOptions={{ className: 'study-toast' }} />
      <header className="site-header">
        <a className="brand" href="/">{isTasks ? 'my / react tasks' : 'study / space'}</a>
        <nav className="main-nav" aria-label="Розділи проєкту">
          <div className={`nav-dropdown ${isHomeworkView ? 'active' : ''}`}>
            <button
              className="nav-dropdown__trigger"
              type="button"
              aria-haspopup="true"
              aria-expanded={isHomeworkView}
              onClick={() => setView('homework')}
            >
              Домашні завдання <span aria-hidden="true">⌄</span>
            </button>
            <div className="nav-dropdown__menu">
              <button className={isHomeworkView ? 'active' : ''} type="button" onClick={() => setView('homework')}>
                <strong>Усі домашки</strong>
                <span>Прогрес і оцінки</span>
              </button>
              {homework.map((item, index) => (
                <button key={item.title} className={view === 'homework-detail' && selectedHomework === index ? 'active' : ''} type="button" onClick={() => { setSelectedHomework(index); setView('homework-detail') }}>
                  <strong>Домашка {index + 1}</strong>
                  <span>{item.course}</span>
                </button>
              ))}
            </div>
          </div>
          <button className={view === 'schedule' ? 'active' : ''} onClick={() => setView('schedule')}>Розклад</button>
          <button className={view === 'tasks' && task === 'city' ? 'active' : ''} onClick={() => { setTask('city'); setView('tasks') }}>Завдання 1</button>
          <button className={view === 'tasks' && task === 'book' ? 'active' : ''} onClick={() => { setTask('book'); setView('tasks') }}>Завдання 2</button>
        </nav>
        <span className="header-status"><span aria-hidden="true" /> вересень 2026</span>
      </header>

      {view === 'homework' && (
        <>
          <Header studentName="Владислав" />
          <StudentProfile {...userProfile} onTransfer={handleTransfer} />
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
                {homework.map((item, index) => (
                  <HomeworkCard
                    key={item.title}
                    {...item}
                    onOpen={() => { setSelectedHomework(index); setView('homework-detail') }}
                  />
                ))}
              </div>
            </Section>

            <section className="courses-section">
              <div className="courses-section__heading">
                <p className="eyebrow">Навчальний кабінет / 03</p>
                <h2>Мої курси</h2>
              </div>
              <div className="courses-content">
                <input
                  className="course-search"
                  type="text"
                  placeholder="Пошук курсу..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <p className="course-search__hint">Пошук за назвою курсу: <strong>{searchQuery}</strong></p>

                <div className="course-list">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course: CourseType) => (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        style={{
                          cursor: 'pointer',
                          outline: selectedCourseId === course.id ? '2px solid #2563eb' : 'none',
                          borderRadius: '6px',
                          transition: 'outline 0.2s ease'
                        }}
                      >
                        <CourseCard {...course} />
                      </div>
                    ))
                  ) : (
                    <p className="course-empty">Курсів не знайдено.</p>
                  )}

                </div>
              </div>
            </section>

            <CourseProgress
              course={activeCourse}
              onCompleteLesson={handleCompleteLesson}
              onResetProgress={handleResetProgress}
            />
            <ProfileEditor />
            <FocusTimer />
            <StudyReminder />
            <StudyLogs onRegister={registerStudyLogs} />
          </main>
          <footer className="site-footer">React + TypeScript <span>Обʼєднаний проєкт / 2026</span></footer>
        </>
      )}

      {view === 'homework-detail' && (
        <main className="homework-detail">
          <button className="back-link" type="button" onClick={() => setView('homework')}>← Назад до моїх домашок</button>
          <div className="homework-detail__hero">
            <div>
              <SectionLabel number={`0${selectedHomework + 1}`}>{selectedHomeworkItem.course}</SectionLabel>
              <h1>{selectedHomeworkItem.title}<span>.</span></h1>
              <p className="lead">{selectedHomeworkItem.description}</p>
            </div>
            <div className={`detail-status ${selectedHomeworkItem.isCompleted ? 'detail-status--done' : ''}`}>
              <span>{selectedHomeworkItem.isCompleted ? '✓' : '!'}</span>
              <strong>{selectedHomeworkItem.isCompleted ? 'Виконано' : 'У роботі'}</strong>
              <small>Дедлайн: {selectedHomeworkItem.deadline}</small>
            </div>
          </div>
          <section className="homework-detail__content">
            <div>
              <SectionLabel number="01">план роботи</SectionLabel>
              <h2>Що потрібно зробити</h2>
              <ol className="homework-steps">
                {selectedHomeworkItem.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <aside className="homework-detail__aside">
              <span className="eyebrow">Результат</span>
              <strong>{selectedHomeworkItem.isCompleted ? `${selectedHomeworkItem.score ?? '—'} / 100` : '0 / 100'}</strong>
              <p>{selectedHomeworkItem.isCompleted ? 'Роботу вже перевірено викладачем.' : 'Після завершення прикріпіть посилання на роботу.'}</p>
              {!selectedHomeworkItem.isCompleted && <button className="homework-card__button" type="button">Здати роботу <span aria-hidden="true">→</span></button>}
            </aside>
          </section>
        </main>
      )}

      {view === 'schedule' && (
        <main>
          <div className="page-intro">
            <p className="eyebrow">Особистий кабінет студента</p>
            <h1>Найближчі<br /><em>заняття.</em></h1>
            <p className="page-intro__description">Усі важливі зустрічі та практичні заняття в одному місці.</p>
          </div>
          <section className="schedule-section">
            <div className="schedule-section__heading">
              <p className="eyebrow">Навчальний тиждень / 01</p>
              <h2>Розклад</h2>
            </div>
            <div>
              <div className="schedule-meta">
                <span>4 заняття</span>
                <span className="legend"><i className="legend__online" /> онлайн <i className="legend__offline" /> офлайн</span>
              </div>
              <div className="lesson-list">
                {lessons.map((lesson) => <LessonCard key={lesson.topic} {...lesson} />)}
              </div>
            </div>
          </section>
        </main>
      )}

      {view === 'tasks' && (
        <>
          <div className="task-switcher">
            <button className={task === 'city' ? 'active' : ''} onClick={() => setTask('city')}>Завдання 1 <span>Моє місто</span></button>
            <button className={task === 'book' ? 'active' : ''} onClick={() => setTask('book')}>Завдання 2 <span>Моя книга</span></button>
          </div>
          {task === 'city' ? <CityTask /> : <BookTask />}
        </>
      )}
    </div>
  )
}

export default App