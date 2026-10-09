import { useCallback, useEffect, useRef, useState } from 'react'

export type AddStudyLog = (courseTitle: string, lessonNumber: number) => void

interface StudyLogsProps {
  onRegister: (addLog: AddStudyLog) => void
}

export default function StudyLogs({ onRegister }: StudyLogsProps) {
  const logsRef = useRef<string[]>([])
  const [showLogs, setShowLogs] = useState(false)
  const [, refreshLogs] = useState(0)

  const addLog = useCallback<AddStudyLog>((courseTitle, lessonNumber) => {
    const time = new Date().toLocaleTimeString('uk-UA', { hour12: false })
    logsRef.current.push(`[${time}] Пройдено урок №${lessonNumber} курсу '${courseTitle}'`)
    refreshLogs((value) => value + 1)
  }, [])

  useEffect(() => {
    onRegister(addLog)
  }, [addLog, onRegister])

  return (
    <section className="study-logs">
      <div className="study-logs__header">
        <div>
          <p className="eyebrow">Навчальний кабінет / 07</p>
          <h2>Історія активності</h2>
        </div>
        <span className="study-logs__count">{logsRef.current.length} записів</span>
      </div>
      <p className="study-logs__description">Тут зберігаються дії, які ви виконували під час навчання.</p>
      <button className="study-logs__button" type="button" onClick={() => setShowLogs((visible) => !visible)}>
        {showLogs ? 'Сховати історію' : 'Показати історію логів'}
        <span aria-hidden="true">{showLogs ? '↑' : '↓'}</span>
      </button>
      {showLogs && (
        logsRef.current.length > 0 ? (
          <ol className="study-logs__list">
            {logsRef.current.map((log, index) => <li key={`${log}-${index}`}>{log}</li>)}
          </ol>
        ) : (
          <p className="study-logs__empty">Історія поки порожня. Пройдіть перший урок.</p>
        )
      )}
    </section>
  )
}
