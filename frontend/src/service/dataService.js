import axios from 'axios'
import globalConfig from './globalConfig'
const GET_REQUEST = 'get'
const POST_REQUEST = 'post'
const dataServerUrl = `http://127.0.0.1:${globalConfig.backendPort}/api`

function request(url, params, type, callback) {
    let func
    if (type === GET_REQUEST) {
        func = axios.get
    } else if (type === POST_REQUEST) {
        func = axios.post
    }

    func(url, params).then((response) => {
            if (response.status === 200) {
                callback(response["data"])
            } else {
                console.error(response) /* eslint-disable-line */
            }
        })
        .catch((error) => {
            console.error(error) /* eslint-disable-line */
        })
}

export default {
    dataServerUrl
}