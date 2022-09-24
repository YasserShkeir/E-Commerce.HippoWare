window.onload = () => {
    console.log(localStorage)
    const logOut=document.getElementById('log-out')
    const logoutModal=document.getElementById('logout-modal')
    const cancelLogout=document.getElementById("cancel-logout")
    const confirmLogout=document.getElementById("confirm-logout")
    const menu= document.getElementById('menu')
    const menuContents= document.getElementById('menu-contents')
    const menuLogOut= document.getElementById('log-out-menu')
    const hamburgerMenu= document.getElementById('hamburger-menu')

    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
            localStorage.clear()
        }
    }
    menuLogOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
            localStorage.clear()
        }
    }

    //////////////////////////////////////////////////////

    //Hamburger menu
    hamburgerMenu.onmouseover=()=>{
        menuContents.style.display='Block'
    }
    menuContents.onmouseleave=()=>{
        menuContents.style.display='none'
    }
    //////////////////////////////////////////////////////

    //display top 5 products
    


}