import user from "../../interfaces/user"
import { useState } from "react"
import "./style.css"
import "../modals/modalPayment.css"


export const UserProfile = (data:user) => {


const [modalPayOpen, setModalPay] =  useState(false)


    
const   Payment = (modal:any) => {


    return(
        <div className="PaymentModal">
            <div><p>Pagamento para</p> <span>{data.name}</span></div>

            
        </div>

    )
}
 





    
    return(

        <> 
        <div className="user">
            <div id="userPerfil">
                <img id="userImg" src={data.img} alt={`Perfil do user ${data.name}`} />
                <div id="userInfo">
                    <p id="userName"> {data.name}</p>
                    <p id="userAcount">ID:{data.id} - Username{data.username} </p>
                </div>

            </div>

            <button id="button" onClick={() => setModalPay(true)} >Pagar</button>
        </div>
       {modalPayOpen ? <Payment />  : null}
       
        
        </>
    )
}