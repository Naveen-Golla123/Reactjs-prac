import React, { useState } from 'react'
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney } from 'react-icons/md'
import { categories } from '../data/data'
import Loader from './Loader';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [colories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setloader] = useState(false);
  const [imageAsset, setImageAsset ] = useState(null);

  const uploadImage = ()=>{
    setImageAsset("https://images.squarespace-cdn.com/content/v1/57d11049f5e2315aa1308dd1/1487542291733-WHZRVPX6DJU1CPK8E74C/20+MB+-+Chicken+Tikka+Platter.png?format=750w")
  };

  const onItemSaved = () =>{
    // Make an API call
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-r-md flex flex-col items-center justify-center gap-4 p-3'>
        <div className='w-full flex items-center border-b border-gray-300 gap-5 p-3'>
          <MdFastfood className='text-xl text-gray-700' />
          <input type="text" required className='w-full h-full border-none text-lg bg-transparent outline-none' placeholder='Item Name..' />
        </div>

        <div className='w-full flex items-center'>
          <select className='w-full bg-transparent p-2 border rounded-md outline-none'>
            <option value="other">Select Category</option>
            {
              categories && categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>

        <div className='w-full h-225 md:h-420 cursor-pointer rounded-md border-gray-300 justify-center items-center flex flex-col border-2 border-dotted'>
            {
              isLoading ? (
                <Loader/>
              ): <>
                {
                  !imageAsset ? <>
                  <label className='w-full h-full flex items-center justify-center cursor-pointer'>
                    <div className='w-full h-full flex items-center justify-center  gap-4'>
                      <MdCloudUpload className='text-gray-600 text-5xl'/>
                      <span className='text-base text-gray-600'>Please upload an image</span>
                    </div>
                    <input type="file" name="uploadimage" accept='image/*' onChange={uploadImage} className="w-0 h-0"/>
                  </label>
                  </> : <>
                    <div className='relative h-full'>
                      <img src={imageAsset} className="h-full" alt="uploaded image"/>
                      <button type="button" className='absolute rounded-full bottom-3 right-4 sm:right-0  bg-red-600 p-3 text-white'>
                        <MdDelete/>
                      </button>
                    </div>
                  </>
                }
              </>
            }
        </div>

        <div className='w-full flex items-center gap-2 border-b-2'>
            <MdAttachMoney className='text-xl'/>
            <input type="number" className='p-2 w-full h-full text-lg bg-transparent outline-none' placeholder='Price'/>
        </div>

        <div className='w-full h-auto flex items-center'>
            <button type='button' className='ml-auto bg-emerald-400 border-none text-white text-xl p-3 w-full md:w-auto rounded-md' onClick={onItemSaved}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer