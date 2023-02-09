import React from 'react'
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider'

const CategoryCard = ({ data }) => {

    const [{visibilityMap}, dispatch] = useStateValue();

    const setVisibility = ()=>{
        dispatch({
            id : data.categoryId,
            type: actionType.CHANGE_VISIBILITY
        })
    }
    
    return (
        <div className={`rounded-full cursor-pointer ${visibilityMap[data.categoryId] ? "text-orange-500 bg-white border-2 border-orange-500 p-2":"text-white bg-orange-500 p-2"}`} onClick={setVisibility}>{data.categoryName}</div>
    )
}

export default CategoryCard