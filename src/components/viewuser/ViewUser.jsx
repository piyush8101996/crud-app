import style from './Viewuser.module.css'
import cx from 'classnames'
const Viewuser = (props) => {

    const user = props.list.map((elem, index) => {
        return (
            <li key={index} className={style.view}>
                {elem &&
                    (
                    <> 
                     {!elem.isedited &&
                        (
                            <>
                                <div className={style.name}>{elem.names}</div>

                                <div className={style.username}>{elem.usernames}</div>

                                <button className={style.button} onClick={() => {
                                    props.onDeletehandler(index)
                                }}>Delete</button>

                                <button className={cx(style.button, style.editbtn)} onClick={() => { props.editHandlers(index) }}>Edit</button>
                            </>
                        )}

                        {elem.isedited &&
                            (
                                <>

                                    <input
                                        className={style.input}
                                        type="text"
                                        name="name"
                                        value={elem.editname}
                                        onChange={(event) => {
                                            props.onEditnameChangeHandler(index, event);
                                        }} />

                                    <input
                                        className={style.input}
                                        type="text"
                                        name="username"
                                        value={elem.editusernames}
                                        onChange={(event) => {
                                            props.onEditusernameChangeHandler(index, event);
                                        }} />

                                    <button
                                        className={cx(style.button, style.updatebtn)}
                                        onClick={() => { props.onEditSaveHandler(index) }}>
                                        Updateuser
                                    </button>

                                    <button
                                        className={style.button}
                                        onClick={() => { props.onEditCancelHandler(index) }}>
                                        Cancel
                                    </button>

                                </>
                            )}

                    </>
                )}

                {!elem && (
                    <>
                        <p>No user</p>
                    </>
                )}
                   {console.log(elem.length)}
            </li>
        )
    })
    
    return (
        <>
            <div  >
                <div>
                    <label className={style.label} htmlFor="">Name</label>
                    <label className={style.label} htmlFor="">Username</label>
                    <label className={style.label} htmlFor="">Actions</label>
                </div>
                <div>
                    {user}
                </div>
            </div>



        </>
    )
}
export default Viewuser;