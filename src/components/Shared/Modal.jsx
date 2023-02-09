import React from 'react'
import Tikka_poster from '../../img/flair_tikka.jpeg';

const Modal = ({onClose}) => {
    return (
        <div className='bg-black bg-opacity-[0.6] fixed flex items-center justify-center inset-0 z-[200]'>
            <div className='flex-col m-4 md:m-40'>
                <div className='flex items-center justify-end p-1'>
                    <div className=' text-white cursor-pointer px-4' onClick={()=> {onClose()}}>
                        X
                    </div>
                </div>
                <div className='bg-white w-auto h-auto p-1 rounded-md'>
                    <div className="w-fit h-fit">
                        <img src={Tikka_poster} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal