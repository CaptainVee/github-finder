
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


// Get search results
export const searchUsers = async (user) => {
    
    const params = new URLSearchParams({
        q: user
    })
    console.log(`${GITHUB_URL}/search/users?${params}`)
    
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`
    // {headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`
    // }}
    )
    
    const {items} = await response.json()

    return items
}