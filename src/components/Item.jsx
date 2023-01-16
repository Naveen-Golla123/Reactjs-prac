import React from 'react'
import ItemImgae from '../img/Chicken_Leg.png'

const Item = () => {
    return (
        <div className='flex flex-col items-center w-auto h-auto bg-gradient-to-br from-orange-200 to-orange-300 rounded-md'>
            <img src={ItemImgae} className="w-[250px]" />
            <div className="flex flex-col items-center">
                <div className='text-base font-semibold '>
                    Chicken Reshmi
                </div>
                <div>
                    $ <span className="text-red-400 font-semibold">14.99</span>
                </div>
            </div>
            <button type="button" className='bg-white p-2 m-2 rounded-lg border-orange-500 border-2'>
                <span className='text-[rgb(249,115,22)] font-semibold '>Add to cart</span>
            </button>
        </div>
    )
}

export default Item