interface HeaderProps {
  studentName?: string
}

export function Header({ studentName = 'студент' }: HeaderProps) {
  return (
    <header className="student-header">
      <div>
        <p className="student-header__title">Електронний щоденник студента</p>
        <p className="student-header__greeting">Вітаємо, {studentName}! Гарного навчання!</p>
      </div>
    </header>
  )
}
