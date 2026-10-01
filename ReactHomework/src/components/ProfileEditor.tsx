import { useState } from 'react'

interface Profile {
  name: string
  specialty: string
  isOnline: boolean
}

const initialProfile: Profile = {
  name: "Ваше Ім'я",
  specialty: 'React Developer',
  isOnline: true,
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  return (
    <section className="profile-editor" aria-labelledby="profile-editor-title">
      <div className="profile-editor__form">
        <p className="eyebrow">Налаштування / 04</p>
        <h2 id="profile-editor-title">Мій профіль</h2>
        <label>
          Імʼя
          <input
            name="name"
            type="text"
            value={profile.name}
            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
          />
        </label>
        <label>
          Спеціальність
          <input
            name="specialty"
            type="text"
            value={profile.specialty}
            onChange={(event) => setProfile({ ...profile, specialty: event.target.value })}
          />
        </label>
        <label className="profile-editor__checkbox-label">
          <input
            name="isOnline"
            type="checkbox"
            checked={profile.isOnline}
            onChange={(event) => setProfile({ ...profile, isOnline: event.target.checked })}
          />
          Онлайн
        </label>
      </div>
      <aside className="profile-badge" aria-label="Попередній перегляд профілю">
        <span className="profile-badge__label">Student profile</span>
        <strong>{profile.name || 'Без імені'}</strong>
        <span>{profile.specialty || 'Без спеціальності'}</span>
        {profile.isOnline && <span className="profile-badge__online">● Онлайн</span>}
      </aside>
    </section>
  )
}
