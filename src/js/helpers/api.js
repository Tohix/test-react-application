/**
 * Make request
 * @returns {Promise}
 */
export default function request(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => (response.ok ? resolve(response.json()) : reject(response.json())))
            .catch((error) => reject({ message: 'Network Error' }))
    })
}