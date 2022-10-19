import {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'


function UserProfile() {
    const params = useParams()
    const {getUserProfile, userProfile,loading } = useContext(GithubContext)

    useEffect(() => {
        getUserProfile(params.login)
    })

    if (!loading) {
        console.log()
        return (
          <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            gkgkgk

          </div>
        )     
    } else {
        return <h1>jgjgj</h1>
    }

}

export default UserProfile