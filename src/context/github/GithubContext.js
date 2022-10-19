import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        userProfile: {}, // you use a curly brace here because its a single user we are fetching
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
        const {data} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Get user profile
    const getUserProfile = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/user/${login}`
        // {headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`
        // }}
        )
        if (response.status === 404){
            window.location = '/notfound'
        }else{
            const {item} = await response.json()
    
            dispatch({
                type: 'GET_USER_PROFILE',
                payload: item
            })
        }
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
        loading: state.loading,
        searchUsers,
        getUserProfile,
        clearUsers
    }}>
        { children }
    </GithubContext.Provider>
}
export default GithubContext