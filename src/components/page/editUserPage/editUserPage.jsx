import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import api from '../../../api'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import PropTypes from 'prop-types'

const EditUserPage = ({ id }) => {
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  // const [user, setUser] = useState('')

  // useEffect(() => {
  //   api.users.getById(id).then((data) => setUser(data))
  //   console.log('api id', user)
  // }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
      console.log('professions in useeffect', professions)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
      console.log('qualitiesList in useeffect', qualitiesList)
    })
  }, [])

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        const obj = { _id: prof.value, name: prof.label }
        return obj
      }
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const [data, setData] = useState({
    email: '',
    profession: getById(id),
    sex: 'male',
    qualities: [],
    name: ''
  })

  console.log('tut data', data)

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { profession, qualities } = data
    console.log('d', {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              value={data.email}
              name="email"
              onChange={handleChange}
            />
            <SelectField
              label="Выберите свою профессию"
              value={data.profession}
              name="profession"
              onChange={handleChange}
              defaultOption="Выберите..."
              options={professions}
            />
            <RadioField
              name="sex"
              onChange={handleChange}
              value={data.sex}
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Other', value: 'other' }
              ]}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              onChange={handleChange}
              options={qualities}
              name="qualities"
              label={'Выберите ваши качества'}
              defaultValue={data.qualities}
            />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  id: PropTypes.string
}

export default EditUserPage
