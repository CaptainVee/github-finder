import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        userProfile: {}, // you use a curly brace here because its a single user we are fetching
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get search results
    const searchUsers = async (user) => {
        setLoading()

        const params = new URLSearchParams({
            q: user
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`
        // {headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`
        // }}
        )
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get user profile
    const getUserProfile = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`
        // {headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`
        // }}
        )
        if (response.status === 404){
            window.location = '/notfound'
        }else{
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER_PROFILE',
                payload: data
            })
        }
    }

    // Get user repos
    const getRepos = async (login) => {
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?=${params}`
        // {headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`
        // }}
        )
        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }


    // Set loading
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    // Clear users
    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS',
    })

    return <GithubContext.Provider value={{
        users: state.users,
        userProfile: state.userProfile,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUserProfile,
        getRepos,
        clearUsers
    }}>
        { children }
    </GithubContext.Provider>
}
export default GithubContext