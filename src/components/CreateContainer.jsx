import React, { useState, useEffect } from 'react'
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney } from 'react-icons/md'
import { useParams } from 'react-router-dom';
import Loader from './Shared/Loader';

const CreateContainer = () => {

  const [name, setName] = useState("");
  const [itemId, setItemId] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [isValidForSave, setSaveValidation] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setloader] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  var [categoryList, setCategoryList] = useState([]);

  var params = useParams();

  useEffect(() => {
    if (params.mode == 'create') {

    } else if (params.mode == 'edit') {
      // get item by id and assign all properties.
      fetch(`http://localhost:3000/api/items/${params.id}`, {
        method: "GET"
      }).then(res => res.json()).then(res => {
        setName(res.name);
        setItemId(res.id);
        setPrice(parseFloat(res.price));
        setImageUrl(res.imgURL)
        setCategory(res.itemCategory.id)
        console.log(res)
      })
    }
  }, []);

  const uploadImage = (event) => {

    console.log(event.target.files)
    var uploadedImg = event.target.files[0];
    setImageUrl(URL.createObjectURL(uploadedImg));
    console.log(URL.createObjectURL(uploadedImg));
    setImageAsset(uploadedImg);
    //setImageAsset("https://images.squarespace-cdn.com/content/v1/57d11049f5e2315aa1308dd1/1487542291733-WHZRVPX6DJU1CPK8E74C/20+MB+-+Chicken+Tikka+Platter.png?format=750w")
  };

  const onItemSaved = () => {
    // Make an API call
    var formdata = new FormData();
    if (imageAsset)
      formdata.append("file", imageAsset, imageAsset.name);
    formdata.append("price", price);
    formdata.append("name", name);
    formdata.append("categoryId", category.toString());
    formdata.append("id", itemId);

    var requestOptions = {
      method: params.mode == 'create' ? 'POST' : 'PATCH',
      body: formdata,
      // headers: {
      //   "Content-type": "multipart/form-data; boundary=<calculated when request is sent>"
      // },
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/Items", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/Setting/GetAllCategories", { method: "GET" }
    ).then(res => res.json()).then(res => {
      console.log(res)
      setCategoryList(res)
    }).catch(err => {
      alert("GetAllCategories API failed" + err)
    })
  }, [])

  const onCategoryChanged = (event) => {
    setCategory(event.target.value)
    checkIsValidForSave();
  }

  const setItemName = (e) => {
    setName(e.target.value);
    checkIsValidForSave();
  }

  const deleteImageAsset = () => {
    setImageAsset(null);
    checkIsValidForSave();
  }


  const checkIsValidForSave = () => {
    if (isPriceValid() && isCategoryValid() && isImageValid() && isItemNameValid()) {
      setSaveValidation(true);
    } else {
      setSaveValidation(false);
    }
    console.log(isValidForSave);
  }

  const isPriceValid = () => {
    return price >= 0
  }

  const isCategoryValid = () => {
    return category && category.length > 0 && category.length < 200;
  }

  const isImageValid = () => {
    console.log(imageUrl && imageUrl.length > 1);
    return imageUrl && imageUrl.length > 1;
  }

  const isItemNameValid = () => {
    return name && name.length > 0 && name.length < 200;
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-r-md flex flex-col items-center justify-center gap-4 p-3'>
        <div className='w-full flex items-center border-b border-gray-300 gap-5 p-3'>
          <MdFastfood className='text-xl text-gray-700' />
          <input type="text" required className='w-full h-full border-none text-lg bg-transparent outline-none' value={name} placeholder='Item Name..' onChange={(e) => setItemName(e)} />
        </div>

        <div className='w-full flex items-center'>
          <select value={category} className='w-full bg-transparent p-2 border rounded-md outline-none' onChange={onCategoryChanged}>
            <option value="other">Select Category</option>
            {
              categoryList && categoryList.map(category => (
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
              <Loader />
            ) : <>
              {
                !imageUrl && imageUrl.length > 1 ? <>
                  <label className='w-full h-full flex items-center justify-center cursor-pointer'>
                    <div className='w-full h-full flex items-center justify-center  gap-4'>
                      <MdCloudUpload className='text-gray-600 text-5xl' />
                      <span className='text-base text-gray-600'>Please upload an image</span>
                    </div>
                    <input type="file" name="uploadimage" accept='image/*' onChange={uploadImage} className="w-0 h-0" />
                  </label>
                </> : <>
                  <div className='relative h-full'>
                    <img src={imageUrl} className="h-full" alt="uploaded image" />
                    <button type="button" className='absolute rounded-full bottom-3 right-4 sm:right-0  bg-red-600 p-3 text-white' onClick={() => { deleteImageAsset() }}>
                      <MdDelete />
                    </button>
                  </div>
                </>
              }
            </>
          }
        </div>

        <div className='w-full flex items-center gap-2 border-b-2'>
          <MdAttachMoney className='text-xl' />
          <input type="number" className='p-2 w-full h-full text-lg bg-transparent outline-none' value={price} placeholder='Price' onChange={event => { setPrice(parseFloat(event.target.value)); checkIsValidForSave(); }} />
        </div>

        <div className='w-full h-auto flex items-center'>
          <button type='button' className={`ml-auto border-none text-white text-xl p-3 w-full md:w-auto rounded-md ${isValidForSave ? "cursor-pointer bg-emerald-400" : "pointer-events-none bg-gray-400"}`} onClick={onItemSaved}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer