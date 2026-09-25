import { useState } from 'react'
import './App.css'

const cityPhotos = [
  {
    title: 'Софійський собор',
    description: 'Одна з найвідоміших памʼяток Києва та України.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/P1030616-1.JPG?width=900',
  },
  {
    title: 'Андріївський узвіз',
    description: 'Історична вулиця, де мистецтво зустрічається з міським життям.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Andriyivskyi%20Descent%20in%20Kyiv%2C%202006.jpg?width=900',
  },
  {
    title: 'Дніпро та набережна',
    description: 'Місце для довгих прогулянок і спостереження за ритмом міста.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyiv%20Dnieper.jpg?width=900',
  },
]

const bookReviews = [
  {
    author: 'Марія, студентка',
    rating: '★★★★★',
    text: 'Книга захоплює з перших сторінок і дуже живо передає атмосферу української природи.',
  },
  {
    author: 'Олег, читач',
    rating: '★★★★☆',
    text: 'Сильна історія про свободу, гідність і людей, які не відмовляються від себе.',
  },
  {
    author: 'Анна, книжковий клуб',
    rating: '★★★★★',
    text: 'Після прочитання хочеться обговорювати героїв і ще раз перечитати улюблені епізоди.',
  },
]

function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span> {children}
    </p>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function PhotoCard({ title, description, image }) {
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

function CitySection() {
  return (
    <main className="content-grid">
      <section className="intro-panel">
        <SectionLabel number="01">місто, яке я люблю</SectionLabel>
        <h1>Київ<span>.</span></h1>
        <p className="lead">
          Столиця України, у якій давня історія поєднується з енергією сучасного міста.
        </p>
        <dl className="facts-list">
          <InfoItem label="Країна" value="Україна" />
          <InfoItem label="Рік заснування" value="482 рік" />
          <InfoItem label="Річка" value="Дніпро" />
        </dl>
      </section>

      <section className="details-panel" aria-labelledby="places-title">
        <div className="section-heading">
          <div>
            <SectionLabel number="02">місця з характером</SectionLabel>
            <h2 id="places-title">Куди варто завітати</h2>
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

function ReviewCard({ author, rating, text }) {
  return (
    <article className="review-card">
      <div className="review-card__top">
        <span className="rating" aria-label="Оцінка 5 з 5">{rating}</span>
        <span className="review-author">{author}</span>
      </div>
      <p>“{text}”</p>
    </article>
  )
}

function BookSection() {
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

      <section className="book-details" aria-labelledby="book-info-title">
        <div className="book-description">
          <SectionLabel number="02">чому саме вона</SectionLabel>
          <h2 id="book-info-title">Історія про свободу, яка не старіє</h2>
          <p>
            Роман розповідає про Григорія Многогрішного, який тікає від переслідувань
            і знаходить нове життя серед українців Зеленого Клину. Це динамічна книга
            про сміливість, кохання та право людини залишатися собою.
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
  const [activeTask, setActiveTask] = useState('city')

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Мої React завдання">my / react tasks</a>
        <nav className="task-nav" aria-label="Навігація завданнями">
          <button
            className={activeTask === 'city' ? 'nav-button active' : 'nav-button'}
            type="button"
            onClick={() => setActiveTask('city')}
          >
            Завдання 1 <span>Моє місто</span>
          </button>
          <button
            className={activeTask === 'book' ? 'nav-button active' : 'nav-button'}
            type="button"
            onClick={() => setActiveTask('book')}
          >
            Завдання 2 <span>Моя книга</span>
          </button>
        </nav>
        <span className="tech-note">React / JSX</span>
      </header>

      {activeTask === 'city' ? <CitySection /> : <BookSection />}

      
    </div>
  )
}

export default App
