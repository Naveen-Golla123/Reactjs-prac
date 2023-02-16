import React, { useState } from 'react'
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import ItemList from './itemList';
import CategoryCard from './CategoryCard'
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const MenuContainer = () => {
    const [menuItems, setMenuItems] = useState({});
    const [{ visibilityMap }, dispatch] = useStateValue();
    
    useEffect(() => {
        fetch("http://localhost:3000/api/Items", { method: "GET" }
        ).then(res => res.json()).then(res => {
            processMenuItems(res);
        }).catch(err => {
            alert("GetAllCategories API failed" + err)
        })
    }, []);

    // manipulating API data
    const processMenuItems = (res) => {
        var menuItems = {};
        res.forEach(item => {
            if (item) {
                var catName = item.itemCategory.name;
                visibilityMap[catName] = false;
                if (menuItems.hasOwnProperty(catName)) {
                    menuItems[catName].push(item)
                } else {
                    menuItems[catName] = [item]
                }
            }
        });
        var firstcategory = Object.keys(visibilityMap)[0]
        visibilityMap[firstcategory] = true;
        dispatch({ type: actionType.SET_VISIBILIYMAP, visibilityMap })
        setMenuItems(menuItems)
    }

    const changeVisibility = (item) => {
        dispatch({
            id: item,
            type: actionType.CHANGE_VISIBILITY
        })
    }

    const categoryCardClicked = (id) => {
        console.log(`entered ${id}`)
        Object.entries(visibilityMap).map(([key, value]) => {
            visibilityMap[key] = (key == id)
        })
    }

    return (
        <div>
            <div id="menu" className='md:hidden flex flex-col justify-center w-full p-2 gap-1'>
                {
                    Object.entries(menuItems).map(([key, value]) => (
                        <div>
                            <div className='flex items-center bg-orange-500 p-3 rounded-md text-white mb-1 hover:shadow-2xl' onClick={() => changeVisibility(key)}>
                                <span>{key}</span>
                                <div className='ml-auto text-xl'>
                                    {
                                        visibilityMap[key] ? <MdExpandMore /> : <MdChevronRight />
                                    }
                                </div>
                            </div>
                            <div className={visibilityMap[key] ? '' : "hidden"}>
                                {value && (<ItemList data={value} />)}
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='hidden md:flex flex-col'>
                <div className='flex items-center justify-center' id='menuCategoryHeader'>
                    <div className='flex items-center justify-center gap-1'>
                        {
                            Object.entries(visibilityMap).map(([key, value]) =>
                                (<CategoryCard data={{ categoryId: key, categoryName: key, categoryCardClicked: (id) => { categoryCardClicked(id) } }} />)
                            )
                        }
                    </div>
                </div>
                {
                    Object.entries(menuItems).map(([key, value]) => (
                        <div className={visibilityMap[key] ? "" : "hidden"}>
                            {value && (<ItemList data={value} />)}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MenuContainer