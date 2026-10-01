interface HeaderProps {
  studentName: string
}

export function Header({ studentName }: HeaderProps) {
  return (
    <header className="student-header">
      <div>
        <p className="student-header__title">Електронный журнал студента</p>
        <p className="student-header__greeting">Привет, {studentName}! Удачи!!</p>
      </div>
    </header>
  )
}
