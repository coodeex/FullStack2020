import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (personObject) => {
  return axios.post(baseUrl, personObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, changedPerson) => {
  return axios.put(`${baseUrl}/${id}`, changedPerson)
}



export default { 
  getAll,
  create,
  deletePerson,
  update
}