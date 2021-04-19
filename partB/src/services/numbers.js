import axios from 'axios'
// const baseUrl = 'http://localhost:3001/'

const getAll = () => {
    axios
        .get('https://helsinki-fullstack-phonebook.herokuapp.com')    
        .then((res)=>{
            return res
        })
        const request = axios.get('https://helsinki-fullstack-phonebook.herokuapp.com')
        return request.then((response) => {
            return response.data
        })
}


const create = (newObject) => {
    // return axios.post('http://localhost:3001/api/persons', newObject)
    return axios.post('https://helsinki-fullstack-phonebook.herokuapp.com', newObject)
}

const personToDelete = (obj) => {
    // return axios.delete(`${baseUrl}/${obj.id}`).then((res) => obj).catch(e => console.log('Cannot delete, user does not exist!'))
    return axios
        // .delete(`${baseUrl}/${obj.id}`)
        // .delete(`http://localhost:3001/api/persons/${obj.id}`)
        .delete(`https://helsinki-fullstack-phonebook.herokuapp.com/${obj.id}`)
        // .then((res) => res.data)
}


const updateNumber = (id, newObj) => {
    const request = axios.put(`https://helsinki-fullstack-phonebook.herokuapp.com/api/${id}`, newObj)
    return request.then(res => res.data) 
    // return axios.put(`${baseUrl}/${id}`, newObj)
}



export default {
    getAll,
    create,
    personToDelete,
    updateNumber
}