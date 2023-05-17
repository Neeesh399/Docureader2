import React from "react";

class Header extends React.Component{

    
    handleLogOut(){
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('username')   
    }

    render (){
        return(
        <div id='header'>
            <div id='logo'>
            DocuChat
            </div>
            <nav id='sidebar'>
                <a className='anchors' href='/'>Home</a>
                {
                    sessionStorage.getItem('id') ? ( 
                        <form action='/login'>
                            <input type='submit' className='customAnchor' onClick={this.handleLogOut} value='Log Out' />
                        </form> )
                    : (
                        <a className='anchors' href="/login">Log In</a>)
                }
                <a className='anchors' href="/signup">Sign Up</a>
            </nav>
        </div>
        );
    }
}

export default Header;