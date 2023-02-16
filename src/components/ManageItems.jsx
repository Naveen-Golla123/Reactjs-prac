import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ManageItems = () => {
    const params = useParams();
    const [items, setItems] = useState([]);
    var navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3000/api/Items", { method: "GET" }
        ).then(res => res.json()).then(res => {
            // processMenuItems(res);
            console.log(res)
            setItems(res)
        }).catch(err => {
            alert("GetAllCategories API failed" + err)
        })
    }, []);

    const editItem = (id)=>{
        console.log(params)
        navigate(`../item/edit/${id}`)
    }

    const deleteItem = (id)=>{
        // place delete API call.
        // navigate('/deleteItem')
    }

    return (
        <div className='flex-col h-screen px-5 py-10'>
            <div id='manageHeader' className='text-2xl text-gray-600'>Manage Items</div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Item
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Availability
                            </th>
                            <th scope="col" class="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item=>(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">
                                    <img src={item.imgURL} className="h-10"/>
                                </td>
                                <td class="px-6 py-4">
                                {item.name}
                                </td>
                                <td class="px-6 py-4">
                                {item.itemCategory && item.itemCategory.name}
                                </td>
                                <td class="px-6 py-4">
                                $ {item.price}
                                </td>
                                <td class="px-6 py-4">
                                {item.isAvailable? 'Available': 'Not Available'}
                                </td>
                                <td class="flex items-center px-6 py-4 space-x-3">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>editItem(item.id)}>Edit</a>
                                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>deleteItem(item.id)}>Remove</a>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageItems;