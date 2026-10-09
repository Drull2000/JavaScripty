import { useState, useEffect } from "react";

export interface CourseType {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  teacher: string;
  credits: number;
}

interface CourseProgressProps {
  course?: CourseType;
  onCompleteLesson?: () => void;
  onResetProgress?: () => void;
}

const getSavedValue = (key: string, defaultValue: string): string => {
  const saved = localStorage.getItem(key);
  return saved !== null ? saved : defaultValue;
};

export default function CourseProgress({
  course,
  onCompleteLesson,
  onResetProgress
}: CourseProgressProps) {
  if (!course) {
    return (
      <div className="course-progress-empty">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }

  const storageKey = `course_activity_${course.id}`;

  const [lastActivity, setLastActivity] = useState<string>(() => {
    return getSavedValue(storageKey, "Курс не розпочато");
  });

  useEffect(() => {
    setLastActivity(getSavedValue(storageKey, "Курс не розпочато"));
  }, [course.id, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, lastActivity);
  }, [lastActivity, storageKey]);

  const isCourseCompleted = course.completedLessons >= course.totalLessons;
  const currentLesson = isCourseCompleted ? course.totalLessons : course.completedLessons + 1;
  const progressPercentage = Math.round((course.completedLessons / course.totalLessons) * 100);

  const handleComplete = () => {
    if (isCourseCompleted) return;

    const currentTime = new Date().toLocaleTimeString("uk-UA");
    setLastActivity(`Завершено урок ${course.completedLessons + 1}. Оновлено ${currentTime}`);

    if (onCompleteLesson) {
      onCompleteLesson();
    }
  };

  const handleReset = () => {
    setLastActivity("Прогрес скинуто. Курс не розпочато");
    localStorage.removeItem(storageKey);

    if (onResetProgress) {
      onResetProgress();
    }
  };

  return (
    <article className="course-progress-card">
      <div className="course-progress-header">
        <h2 className="course-progress-title">📈 Прогрес курсу: {course.title}</h2>
        <span className="course-progress-tag">прогрес</span>
      </div>

      <div className="course-progress-body">
        <div className="course-progress-counter">
          <p className="course-progress-counter-label">Пройдено</p>
          <div className="course-progress-counter-value">
            {course.completedLessons}
            <span className="course-progress-counter-total">/{course.totalLessons}</span>
          </div>
          <p className="course-progress-counter-label">уроків</p>
        </div>

        <div className="course-progress-bar-wrapper">
          <div className="course-progress-status">
            {isCourseCompleted
              ? "🎉 Вітаємо, курс завершено!"
              : `Поточний: Урок №${currentLesson}`}
          </div>
          <div className="course-progress-bar-track">
            <div
              className="course-progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <p className="course-progress-activity">
        <strong>Остання активність:</strong> {lastActivity}
      </p>

      <div className="course-progress-actions">
        <button
          className="btn-complete"
          onClick={handleComplete}
          disabled={isCourseCompleted}
        >
          {isCourseCompleted ? "Курс завершено" : "Позначити урок пройденим"}
        </button>

        <button className="btn-reset" onClick={handleReset}>
          Скинути прогрес
        </button>
      </div>
    </article>
  );
}