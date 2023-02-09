const fetchUserData = ()=> {
    console.log(localStorage.getItem('userInfo'))
    const userInfo = 
                localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : localStorage.clear();
    console.log(userInfo)
    return userInfo
}

export default fetchUserData