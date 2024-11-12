import React, { useContext } from 'react'
import { MyContext } from '../App'

const CardBody = () => {


const user = useContext(MyContext)

  return (
    <div>


    
            {user}

    </div>
  )
}

export default CardBody