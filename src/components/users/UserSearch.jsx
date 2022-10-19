
import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
    const [text, setText] = useState('')

    const {users, searchUsers, clearUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => setText(e.target.value)
    const handleClear = (e) => clearUsers()
    const handleSubmit = (e) => {
        if (text === ''){
<<<<<<< HEAD
            alert(e)
=======
            setAlert('Please enter a value', 'error')
>>>>>>> dev
        }else{
            searchUsers(text)
        }

        e.preventDefault()
    }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input value={text} onChange={handleChange} type="text" placeholder="Search" className="w-full pr-40 bg-gray-200 input input-lg text-black" />
                        <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
                    </div>
                </div>
            </form>
        </div>
        {/* Only show clear button if there are users */}
        {users.length > 0 && (
            <div>
                <button onClick={handleClear} className="btn btn-ghost btn-lg">Clear</button>
            </div>
        
        )}


    </div>
  )

}
export default UserSearch