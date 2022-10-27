import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_URL,
    // headers: { Authorization: `token ${GITHUB_TOKEN}`}

})

// Get search results
export const searchUsers = async (user) => {
    
    const params = new URLSearchParams({
        q: user
    })
    
    const response = await github.get(`/search/users?${params}`)
    
    return response.data.items
}


// get userprofile and repo
export const getUserProfileAndRepos = async (login) => {
    const [userProfile, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return { userProfile: userProfile.data, repos: repos.data}
}


    // // Get user profile
    // export const getUserProfile = async (login) => {

    //     const response = await fetch(`${GITHUB_URL}/users/${login}`
    //     // {headers: {
    //     //     Authorization: `token ${GITHUB_TOKEN}`
    //     // }}
    //     )
    //     if (response.status === 404){
    //         window.location = '/notfound'
    //     }else{
    //         const data = await response.json()
    //         return data
    //     }
    // }

    // // Get user repos
    // export const getRepos = async (login) => {
    //     const params = new URLSearchParams({
    //         sort: 'created',
    //         per_page: 10
    //     })

    //     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?=${params}`
    //     // {headers: {
    //     //     Authorization: `token ${GITHUB_TOKEN}`
    //     // }}
    //     )
    //     const data = await response.json()
    //     return data
    // }