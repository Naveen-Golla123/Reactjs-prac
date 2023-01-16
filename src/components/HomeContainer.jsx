import React from 'react'
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png'
import ChickenReshmi from '../img/Chicken_Reshmi.png'
import ChickenLeg from '../img/Chicken_Leg.png'

const heropData = [
  { id: 1, name: 'Chikcen Reshmi', price: "15.99", imageSrc: ChickenReshmi },
  { id: 1, name: 'Chicken Leg', price: "14.99", imageSrc: ChickenLeg },
  { id: 1, name: 'Chikcen Reshmi', price: "15.99", imageSrc: ChickenReshmi },
  { id: 1, name: 'Chicken Leg', price: "14.99", imageSrc: ChickenLeg }
]

const HomeContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-auto' id="home">
      <div className='py-2 flex flex-col items-start justify-center gap-6'>
        <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-5 py-2'>
          <p className='text-base text-orange-500 font-semibold'>Events and Catering are our special</p>
          <div className='w-8 h-8 rounded-full overflow-hidden'>
            <img src={Delivery} className='w-full h-full object-contain' />
          </div>
        </div>
        <p className='text-[2.3rem] md:text-[3.25rem] font-bold tracking-wide text-headingColor'>
          Tikka Guys serves entrees that combine <span className='text-orange-500 text-[2.7rem] md:text-[4rem]'>Pakistani</span> and <span className='text-orange-500 text-[2.7rem] md:text-[4rem]'>Mediterranean</span> flavours.
        </p>

        <p classNa  me='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Tikka Guys also caters to office gatherings, parties, events, and other festivities or celebrations. Please call Faheem Hayat at (949) 433-3077 or (714) 598-7400 to place an order
        </p>

        <button
          type='button'
          className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-36 p-3 rounded-full hover:shadow-lg'>
          Order Now
        </button>
      </div>
      <div className='py-2 flex-1 flex items-center relative'>
        <img src={HeroBg} className="ml-auto h-auto md:w-1/2 w-full z-1 md:h-420 lg:h-650" alt="hero-bg" />

        <div className='w-full h-auto md:w-full md:h-full  absolute top-0 left-0 flex items-center justify-center px-2 py-8'>
          <div className='w-full h-auto flex items-center justify-center flex-wrap gap-4 lg:gap-10'>
            {heropData && heropData.map(n => (
              <div className='md:w-190 w-[160px] p-1 bg-cardOverlay rounded-2xl flex flex-col items-center drop-shadow-lg min-h-210'>
                <img src={n.imageSrc} className="w-50" alt="ChieckReshmi" />
                <p className='text-[18px] font-semibold text-textColor my-2'>{n.name}</p>
                <p className='text-sm font-semibold text-headingColor'><span className='text-red-500'>$</span>{n.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContainer