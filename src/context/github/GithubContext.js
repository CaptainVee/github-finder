import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";


const GithubContext = createContext()


export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        userProfile: {}, // you use a curly brace here because its a single user we are fetching
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


    return <GithubContext.Provider value={{
        ...state,
        dispatch,
    }}>
        { children }
    </GithubContext.Provider>
}
export default GithubContext