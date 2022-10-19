
import {useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext'

function Alert() {
    const {alert} = useContext(AlertContext)

  return alert !== null && (
        <div className="flex item-start mb-4 space-x-2">
            {alert.type === 'error' && (
                <h3>hfhfhf</h3>
            )}
            <p className='flex-1 text-base font-semibold leading-7 text-white'>
                <strong>{alert.msg}</strong>
            </p>
        </div>
  )
}

export default Alert