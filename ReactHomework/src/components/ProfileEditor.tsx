import { useState } from 'react'

interface Profile {
  name: string
  group: string
  email: string
}

const initialProfile: Profile = {
  name: 'Владислав',
  group: 'P-410',
  email: 'vladyslav@example.com',
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))
  }

  return (
    <section className="profile-editor" aria-labelledby="profile-editor-title">
      <div className="profile-editor__form">
        <p className="eyebrow">Налаштування / 04</p>
        <h2 id="profile-editor-title">Мій профіль</h2>
        <label>
          Імʼя
          <input name="name" type="text" value={profile.name} onChange={handleChange} />
        </label>
        <label>
          Група
          <input name="group" type="text" value={profile.group} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={profile.email} onChange={handleChange} />
        </label>
      </div>
      <aside className="profile-badge" aria-label="Попередній перегляд профілю">
        <span className="profile-badge__label">Student profile</span>
        <strong>{profile.name || 'Без імені'}</strong>
        <span>{profile.group || 'Без групи'}</span>
        <span>{profile.email || 'Без email'}</span>
      </aside>
    </section>
  )
}
