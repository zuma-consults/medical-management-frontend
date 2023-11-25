import axios from "axios"


const client = axios.create({baseURL: 'http://localhost:5000/'})


export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`

    const onSuccess = (response) => response
    const onError = (error) => {
        console.log(error)
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}


/*
        HOW TO USE THE REQUEST FUNCTION

    import request from @/lib/utils

    request({url: '/chisom', method: 'post', data: {}})
*/