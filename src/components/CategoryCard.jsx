import React from 'react'

const CategoryCard = ({ data }) => {
    return (
        <div className='text-white bg-orange-500 p-2 rounded-full cursor-pointer' onClick={() => { data.categoryCardClicked(data.categoryId) }}>{data.categoryName}</div>
    )
}

export default CategoryCard