import axios from 'axios'
const baseUrl = 'http://localhost:3001'
const herokuUrl = `https://helsinki-fullstack-phonebook.herokuapp.com`

const getAll = () => {
    // axios
    //     .get('http://localhost:3001/')    
    //     .then((res)=>{
    //         console.log('fuckfusaudsudiaisdasdasdsa')
    //         return res.data
    //     })
        const request = axios.get('http://localhost:3001/')
        return request.then((response) => {
            return response.data
        })
}


const create = (newObject) => {
    // return axios.post('http://localhost:3001/api/persons', newObject)
    return axios.post(`${baseUrl}/api/persons`, newObject)
}

const personToDelete = (obj) => {
    // return axios.delete(`${baseUrl}/${obj.id}`).then((res) => obj).catch(e => console.log('Cannot delete, user does not exist!'))
    return axios
        // .delete(`${baseUrl}/${obj.id}`)
        // .delete(`http://localhost:3001/api/persons/${obj.id}`)
        .delete(`${baseUrl}/api/persons/${obj.id}`)
        // .then((res) => res.data)
}


const updateNumber = (id, newObj) => {
    console.log(newObj)
    const request = axios.put(`${baseUrl}/api/persons/${id}`, newObj)
    return request.then(res => res.data) 
    // return axios.put(`${baseUrl}/${id}`, newObj)
}



export default {
    getAll,
    create,
    personToDelete,
    updateNumber
}