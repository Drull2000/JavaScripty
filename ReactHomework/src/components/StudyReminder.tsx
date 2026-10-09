import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function StudyReminder() {
  const [message, setMessage] = useState('')
  const [seconds, setSeconds] = useState('10')
  const [isScheduled, setIsScheduled] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
  }, [])

  const cancelTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsScheduled(false)
  }

  const startTimer = () => {
    const reminder = message.trim()
    const delay = Number(seconds)

    if (!reminder) {
      toast.error('Введіть текст нагадування.')
      return
    }

    if (!Number.isFinite(delay) || delay <= 0) {
      toast.error('Вкажіть кількість секунд більше нуля.')
      return
    }

    cancelTimer()
    setIsScheduled(true)
    timerRef.current = window.setTimeout(() => {
      toast.success(reminder, { duration: 5000 })
      timerRef.current = null
      setIsScheduled(false)
    }, delay * 1000)
  }

  return (
    <section className={`study-reminder ${isScheduled ? 'study-reminder--scheduled' : ''}`}>
      <div className="study-reminder__heading">
        <div>
          <p className="eyebrow">Навчальний кабінет / 06</p>
          <h2>Нагадування про навчання</h2>
        </div>
        <span className="study-reminder__icon" aria-hidden="true">◷</span>
      </div>
      <p className="study-reminder__description">Заплануйте коротке нагадування, щоб не забути повернутися до навчання.</p>
      <div className="study-reminder__form">
        <label>
          Текст нагадування
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Час повторити хуки!"
            disabled={isScheduled}
          />
        </label>
        <label>
          Секунди
          <input
            type="number"
            min="1"
            step="1"
            value={seconds}
            onChange={(event) => setSeconds(event.target.value)}
            disabled={isScheduled}
          />
        </label>
      </div>
      <div className="study-reminder__actions">
        {isScheduled ? (
          <>
            <span className="study-reminder__status">Нагадування встановлено</span>
            <button className="study-reminder__button study-reminder__button--cancel" type="button" onClick={cancelTimer}>
              Скасувати
            </button>
          </>
        ) : (
          <button className="study-reminder__button" type="button" onClick={startTimer}>
            Встановити таймер <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </section>
  )
}
