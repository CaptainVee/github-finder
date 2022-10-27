

const githubReducer = (state, action) => {
    switch(action.type){
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'GET_USER_PROFILE_AND_REPOS':
            return {
                ...state,
                userProfile: action.payload.userProfile,
                repos: action.payload.repos,
                loading: false
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: [],
                loading: false
            }
        default:
            return state
    }
}

export default githubReducer