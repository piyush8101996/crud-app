import { useEffect, useState } from "react";
import Viewuser from "../viewuser/ViewUser";
import style from "./Adduser.module.css"

const Adduser = () => {
    const initialstate= {name: '', username: '' }
   
    const [userdata, setUserdata] = useState({
        name: '', username: ''
    })

    const [userlist, setUserlist] = useState([])

    useEffect(()=>{
        // To get the localStroage to get the todoList data
        let userlists = localStorage.getItem('List');
        if(userlists) {
            userlists = JSON.parse(userlists); // String --> object
            setUserlist(userlists);
        } 
     
    }, []);
 
    //To set the data in localstorage
    useEffect(()=>{
        const userlists = JSON.stringify(userlist); // Object --> String
        localStorage.setItem('List',userlists);
    }, [userlist]);

    const adduserHandler = () => {
       
        if(userdata.name.trim() && userdata.username.trim()){
            const user = [...userlist]
            user.push(
                {
                    names: userdata.name,
                    usernames: userdata.username,
                    isedited: false,
                    editname:userdata.name,
                    editusernames:userdata.username,
                }
            )
            setUserlist(user);
    
            setUserdata(initialstate)//clearing the user feild
        }
            
    }

    const deleteHandler = (index) => {
        const user = [...userlist]
        user.splice(index, 1)
        setUserlist(user);
        
    }

    //onchange userdata Handler
    const changeHandler = (e) => {
        const { name, value } = e.target
        setUserdata(prevdata => ({
            ...prevdata,
            [name]: value
        }))
    }

    //user edit handler
    const onEditHandler = (index) => {
        const userlists = [...userlist];
        userlists[index].isedited = true;  
        setUserlist(userlists);
    };

     //for cancelling edit operation
    const onEditCancel = (itemIndex) => {
        const userlists = [...userlist];
        userlists[itemIndex].editname = userlist[itemIndex].names;
        userlists[itemIndex].editusernames = userlist[itemIndex].usernames;
        userlists[itemIndex].isedited = false;
        setUserlist(userlists);
    };

     //onchange property during editing mode for name value
    const onEditnameChange = (itemIndex, event) => {
        const name = event.target.value;
        const userlists = [...userlist];
        userlists[itemIndex].editname = name;
        setUserlist(userlists);
    };

    //onchange property during editing mode for username
    const onEditusernameChange = (itemIndex, event) => {
        const username=event.target.value
        const userlists = [...userlist];
       userlists[itemIndex].editusernames =username ;
        setUserlist(userlists);
    };


     //To update the user
    const updateuser = (itemIndex) => {

        const  userlists= [...userlist];
        const editedName = userlist[itemIndex].editname.trim();
        const editedUsername = userlist[itemIndex].editusernames.trim();

        if(editedName  && editedUsername ){
            userlists[itemIndex].names =editedName ;
            userlists[itemIndex].editname =editedName

            userlists[itemIndex].usernames =editedUsername ;
            userlists[itemIndex].editusernames =editedUsername

            userlists[itemIndex].isedited = false;
            setUserlist(userlists);
        }else {
            userlist[itemIndex].editname = userlist[itemIndex].names;
            userlist[itemIndex].editusernames = userlist[itemIndex].usernames;

            userlist[itemIndex].isedited = false;
            setUserlist(userlist);
        }
    };

    



    return (
        <>
            
                <div>
                    <div>
                        <label className={style.label}>Name</label><br />
                        <input type="text"
                            placeholder="Enter the name"
                            name="name"
                            value={userdata.name}
                            onChange={changeHandler} />
                    </div>

                    <div>
                        <label className={style.label} >Username</label><br />
                        <input type="text"
                            placeholder="Enter the username"
                            name="username"
                            value={userdata.username}
                            onChange={changeHandler} />
                    </div>

                    <div>
                        <button className={style.button} onClick={adduserHandler}>Add New User</button>
                    </div>
                </div>


            
            <Viewuser list={userlist} 
            onDeletehandler={deleteHandler}
            onEditnameChangeHandler={onEditnameChange} 
            onEditusernameChangeHandler={onEditusernameChange}
            onEditSaveHandler={ updateuser  }
            onEditCancelHandler={onEditCancel}
            editHandlers={onEditHandler}/>

        </>
    )

}
export default Adduser;