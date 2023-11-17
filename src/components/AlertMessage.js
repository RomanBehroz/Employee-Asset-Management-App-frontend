import React from 'react'

/**
 *  @Author Roman Behroz
 * @returns Footer of my Web Page Applications
 */
const AlertMessage = ({messageActive, messageClass, message, setMessageActive}) => {
    return (
        <>
            {
                messageActive ? (   <div className={messageClass}>
                    {message}
                    <div onClick={() => setMessageActive(false)} className='closebtn'><img src='images/cross.png'/></div>
                </div> ):(<></>)
            }
        </>
    )
}

export default AlertMessage