import React from 'react'
import { useState } from 'react';
import HomeContainer from './HomeContainer'
import MenuContainer from './MenuContainer'
import Modal from './Shared/Modal';


const MainContainer = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className='w-full flex flex-col items-center h-auto justify-center'>
      { showModal? (<Modal onClose={()=>{setShowModal(!showModal)}}/>) : null }
      <HomeContainer />
      <MenuContainer />
    </div>
  )
}

export default MainContainer