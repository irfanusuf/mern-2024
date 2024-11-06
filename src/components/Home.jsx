import React from 'react'
import Card from '../sharedComponents/Card'

const Home = (props) => {
  return (
    <div>
        

        welcome {props.user}



        <Card user={props.user}/>




    </div>
  )
}

export default Home