export const isLoggedIn = () =>
{
    let data=JSON.parse(localStorage.getItem("data"));
    
    if(data.role=="user")
    {   
        console.log(data);
        return true;
    }
    else
    {
        return false;
    }
};

export const doLogin=(data)=>
{
    localStorage.setItem("data",JSON.stringify(data));
}

export const doLogout=()=>
{
    localStorage.removeItem("data");
}

export const getcurrentuser=()=>
{
    if(isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data"));
    }
    else
    {
        return false;
    }
}