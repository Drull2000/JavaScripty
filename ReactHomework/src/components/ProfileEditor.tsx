import { useFieldArray, useForm, Controller } from 'react-hook-form'
import Select, { type MultiValue } from 'react-select'
import toast from 'react-hot-toast'

interface LanguageOption {
  value: string
  label: string
}

interface ProfileFormValues {
  fullName: string
  email: string
  phones: { value: string }[]
  languages: LanguageOption[]
  specialty: string
  isOnline: boolean
}

const languageOptions: LanguageOption[] = [
  { value: 'uk', label: 'Українська' },
  { value: 'en', label: 'Англійська' },
  { value: 'pl', label: 'Польська' },
  { value: 'de', label: 'Німецька' },
  { value: 'fr', label: 'Французька' },
]

const initialProfile: ProfileFormValues = {
  fullName: 'Ваше Імʼя',
  email: '',
  phones: [{ value: '' }],
  languages: [],
  specialty: 'React Developer',
  isOnline: true,
}

export default function ProfileEditor() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({ defaultValues: initialProfile })
  const { fields, append, remove } = useFieldArray({ control, name: 'phones' })
  const profile = watch()

  const onSubmit = (values: ProfileFormValues) => {
    toast.success('Профіль збережено')
    console.log('Profile updated', values)
  }

  return (
    <section className="profile-editor" aria-labelledby="profile-editor-title">
      <form className="profile-editor__form" onSubmit={handleSubmit(onSubmit)}>
        <p className="eyebrow">Налаштування / 04</p>
        <h2 id="profile-editor-title">Мій профіль</h2>

        <label>
          ПІБ студента
          <input
            {...register('fullName', { required: 'Вкажіть ПІБ студента' })}
            type="text"
            autoComplete="name"
          />
          {errors.fullName && <span className="profile-editor__error">{errors.fullName.message}</span>}
        </label>

        <label>
          Електронна пошта
          <input
            {...register('email', {
              required: 'Вкажіть електронну пошту',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Вкажіть коректну електронну пошту' },
            })}
            type="email"
            autoComplete="email"
          />
          {errors.email && <span className="profile-editor__error">{errors.email.message}</span>}
        </label>

        <div className="profile-editor__phones">
          <span className="profile-editor__field-label">Номери телефону</span>
          {fields.map((field, index) => (
            <div className="profile-editor__phone-row" key={field.id}>
              <input
                {...register(`phones.${index}.value`, {
                  required: 'Вкажіть номер телефону',
                  pattern: { value: /^[+\d\s()-]{7,}$/, message: 'Вкажіть коректний номер' },
                })}
                type="tel"
                placeholder="+380 00 000 00 00"
                autoComplete="tel"
              />
              {fields.length > 1 && (
                <button className="profile-editor__remove" type="button" onClick={() => remove(index)}>
                  Видалити
                </button>
              )}
              {errors.phones?.[index]?.value && (
                <span className="profile-editor__error">{errors.phones[index]?.value?.message}</span>
              )}
            </div>
          ))}
          <button className="profile-editor__add" type="button" onClick={() => append({ value: '' })}>
            + Додати номер
          </button>
        </div>

        <label>
          Володіння мовами
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <Select<LanguageOption, true>
                {...field}
                isMulti
                options={languageOptions}
                placeholder="Оберіть мови..."
                className="profile-editor__select"
                classNamePrefix="profile-select"
                onChange={(value: MultiValue<LanguageOption>) => field.onChange(value)}
              />
            )}
          />
        </label>

        <label>
          Спеціальність
          <input {...register('specialty')} type="text" />
        </label>

        <label className="profile-editor__checkbox-label">
          <input {...register('isOnline')} type="checkbox" />
          Онлайн
        </label>

        <button className="profile-editor__submit" type="submit">Зберегти профіль</button>
      </form>
      <aside className="profile-badge" aria-label="Попередній перегляд профілю">
        <span className="profile-badge__label">Student profile</span>
        <strong>{profile.fullName || 'Без імені'}</strong>
        <span>{profile.specialty || 'Без спеціальності'}</span>
        {profile.email && <span>{profile.email}</span>}
        {profile.phones?.filter((phone) => phone.value).map((phone) => <span key={phone.value}>{phone.value}</span>)}
        {profile.languages?.length > 0 && (
          <span>{profile.languages.map((language) => language.label).join(', ')}</span>
        )}
        {profile.isOnline && <span className="profile-badge__online">● Онлайн</span>}
      </aside>
    </section>
  )
}
