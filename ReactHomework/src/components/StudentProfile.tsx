interface StudentProfileProps {
  name: string
  group: string
  isOnline: boolean
  onTransfer: () => void
}

export function StudentProfile({ name, group, isOnline, onTransfer }: StudentProfileProps) {
  return (
    <section className="student-profile" aria-label="Профіль студента">
      <p className="student-profile__name">{name}</p>
      <p className="student-profile__group">Група: {group}</p>
      <button className="student-profile__transfer" type="button" onClick={onTransfer}>
        {isOnline ? 'Вийти з онлайн' : 'Увійти в онлайн'}
      </button>
      <p className="student-profile__status">
        Статус: {isOnline ? (
          <span className="student-profile__online">Онлайн</span>
        ) : (
          <span className="student-profile__offline">Офлайн</span>
        )}
      </p>
    </section>
  )
}
