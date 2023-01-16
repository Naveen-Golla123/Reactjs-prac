import React from 'react'
import HomeContainer from './HomeContainer'
import MenuContainer from './MenuContainer'


const MainContainer = () => {
  return (
    <div className='w-full flex flex-col items-center h-auto justify-center'>
      <HomeContainer />
      <MenuContainer />
    </div>
  )
}

export default MainContainer