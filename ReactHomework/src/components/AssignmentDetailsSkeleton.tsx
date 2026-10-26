export default function AssignmentDetailsSkeleton() {
  return (
    <main className="homework-detail assignment-skeleton" aria-busy="true" aria-label="Завантаження деталей завдання">
      <div className="assignment-skeleton__back" />
      <div className="homework-detail__hero">
        <div>
          <div className="assignment-skeleton__label" />
          <div className="assignment-skeleton__title" />
          <div className="assignment-skeleton__description" />
        </div>
        <div className="assignment-skeleton__status" />
      </div>
      <section className="homework-detail__content">
        <div>
          <div className="assignment-skeleton__label" />
          <div className="assignment-skeleton__heading" />
          <div className="assignment-skeleton__lines" />
        </div>
        <div className="assignment-skeleton__aside" />
      </section>
    </main>
  )
}
