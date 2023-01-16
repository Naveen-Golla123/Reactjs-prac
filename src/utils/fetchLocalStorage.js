const fetchUserData = ()=> {
    console.log(localStorage.getItem('user'))
    const userInfo = 
                localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    console.log(userInfo)
    return userInfo
}

export default fetchUserData