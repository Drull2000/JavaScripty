import { useState, useEffect } from "react";

interface CourseProgressProps {
  courseTitle?: string;
}

const getSavedValue = (key: string, defaultValue: any): any => {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return saved;
    }
  }
  return defaultValue;
};

export default function CourseProgress({ courseTitle = "Курс без назви" }: CourseProgressProps) {
  const totalLessons = 12;

  const [completedLessons, setCompletedLessons] = useState<number>(() => getSavedValue("completedLessons", 0));
  const [currentLesson, setCurrentLesson] = useState<number>(() => getSavedValue("currentLesson", 1));
  const [lastActivity, setLastActivity] = useState<string>(() => getSavedValue("lastActivity", "Курс не розпочато"));

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    localStorage.setItem("currentLesson", JSON.stringify(currentLesson));
    localStorage.setItem("lastActivity", lastActivity);
  }, [completedLessons, currentLesson, lastActivity]);

  const isCourseCompleted = completedLessons >= totalLessons;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const handleCompleteLesson = () => {
    if (isCourseCompleted) return;

    setCompletedLessons((prev) => prev + 1);
    setCurrentLesson((prev) => (prev < totalLessons ? prev + 1 : totalLessons));

    const currentTime = new Date().toLocaleTimeString("uk-UA");
    setLastActivity(`Завершено урок ${completedLessons + 1}. Оновлено ${currentTime}`);
  };

  const handleResetProgress = () => {
    setCompletedLessons(0);
    setCurrentLesson(1);
    setLastActivity("Прогрес скинуто. Курс не розпочато");
    localStorage.removeItem("completedLessons");
    localStorage.removeItem("currentLesson");
    localStorage.removeItem("lastActivity");
  };

  return (
    <article className="course-progress-card">
      <div className="course-progress-header">
        <h2 className="course-progress-title">{courseTitle}</h2>
        <span className="course-progress-tag">прогресс</span>
      </div>

      <div className="course-progress-body">
        <div className="course-progress-counter">
          <p className="course-progress-counter-label">Пройдено</p>
          <div className="course-progress-counter-value">
            {completedLessons}<span className="course-progress-counter-total">/{totalLessons}</span>
          </div>
          <p className="course-progress-counter-label">уроків</p>
        </div>

        <div className="course-progress-bar-wrapper">
          <div className="course-progress-status">
            {isCourseCompleted ? "🎉 Вітаємо, курс завершено!" : `Поточний: Урок №${currentLesson}`}
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
          onClick={handleCompleteLesson} 
          disabled={isCourseCompleted}
        >
          Завершити урок
        </button>
        
        <button 
          className="btn-reset"
          onClick={handleResetProgress}
        >
          Скинути прогрес
        </button>
      </div>
    </article>
  );
}