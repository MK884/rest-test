import axios, { all } from 'axios';

const baseURL = 'http://localhost:3000/api/notes'

const getAll = ()=>{
    const request = axios.get(baseURL);
    return request.then(res=>res.data);
}

const create = newObject => {
    const request = axios.post(baseURL,newObject);
    return request.then(res=>res.data);
}

const update = (id, newObject) =>{
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
} 

export default { getAll, create, update}