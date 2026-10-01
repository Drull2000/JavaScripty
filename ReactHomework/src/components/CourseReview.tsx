import { useState } from 'react'

export default function CourseReview() {
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <section className="course-review" aria-labelledby="course-review-title">
      <div className="course-review__heading">
        <p className="eyebrow">Зворотний звʼязок / 05</p>
        <h2 id="course-review-title">Оцініть курс</h2>
      </div>
      {isSubmitted ? (
        <div className="course-review__thanks">
          <h3>Дякуємо за відгук!</h3>
          <p>
            Ваша оцінка: {rating}. Ваш коментар: {reviewText || 'Коментар не залишено.'}
          </p>
        </div>
      ) : (
        <form
          className="course-review__form"
          onSubmit={(event) => {
            event.preventDefault()
            setIsSubmitted(true)
          }}
        >
          <fieldset>
            <legend>Оцінка курсу</legend>
            <div className="course-review__ratings">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={rating === value ? 'is-selected' : ''}
                  type="button"
                  aria-pressed={rating === value}
                  onClick={() => setRating(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Ваш коментар
            <textarea
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="Поділіться враженнями про курс"
              rows={5}
            />
          </label>
          <button className="course-review__submit" type="submit">
            Відправити відгук
          </button>
        </form>
      )}
    </section>
  )
}