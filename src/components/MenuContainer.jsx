import React, { useState } from 'react'
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import ItemList from './itemList';
import CategoryCard from './CategoryCard'
import { categories, dbItemsData } from '../data/data'

const MenuContainer = () => {

    const [visibilityMap, setVisibility] = useState({
        "Chicken": false,
        "Beef": false,
        "Mutton": false,
        "Veg": false,
        "Desert": false,
        "Drinks": false
    })

    console.log(categories.length)

    const changeVisibility = (item) => {
        setVisibility({ ...visibilityMap, [item]: !visibilityMap[item] })
    }

    const categoryCardClicked = (id) => {
        console.log(`entered ${id}`)
        setVisibility({ ...visibilityMap, [id]: !visibilityMap[id] })
        console.log(visibilityMap)
    }

    return (
        <div>
            <div id="menu" className='md:hidden flex flex-col justify-center w-full p-2 gap-1'>
                <div className='flex items-center bg-orange-500 p-3 rounded-md text-white mb-1 hover:shadow-2xl' onClick={() => changeVisibility("Chicken")}>
                    <span>Chicken</span>
                    <div className='ml-auto text-xl'>
                        {
                            visibilityMap.Chicken ? <MdExpandMore /> : <MdChevronRight />
                        }
                    </div>
                </div>
                <div className={visibilityMap.Chicken ? '' : "hidden"}>
                    <ItemList />
                </div>
                <div className='flex items-center bg-orange-500 p-3 rounded-md text-white mb-1' onClick={() => changeVisibility("Beef")}>
                    <span>Beef</span>
                    <div className='ml-auto text-xl'>
                        {
                            visibilityMap.Beef ? <MdExpandMore /> : <MdChevronRight />
                        }
                    </div>
                </div>
                <div className={visibilityMap.Beef ? '' : "hidden"}>
                    <ItemList />
                </div>
            </div>

            <div className='hidden md:flex flex-col'>
                <div className='flex items-center justify-center' id='menuCategoryHeader'>
                    <div className='flex items-center justify-center gap-1'>
                        {
                            categories.map(category =>
                                (<CategoryCard data={{ categoryId: category.id, categoryName: category.name, categoryCardClicked: (id) => { categoryCardClicked(id) } }} />)
                            )
                        }
                    </div>
                </div>
                {
                    Object.entries(dbItemsData).map(([key, value]) => (
                        <div className={visibilityMap[key] ? "" : "hidden"}>
                            {value}
                            <ItemList data={value}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MenuContainer