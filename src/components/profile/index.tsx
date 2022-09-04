import user from "../../interfaces/user"
import { useState} from "react"
import "./style.css"
import "../modals/index"
import "../modals/index"

import Modal from "react-modal"

Modal.setAppElement('#rootmodal')


export const UserProfile = (data:user) => {

    function onClose(){
        setModalPay(false)
    }


    //modal payment
    const [modalPayOpen, setModalPay] =  useState(false)


    const customStyles = {
        content: {
            width:'70%',
            height:'50%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '10px 50px 0px 100vh rgba(0, 0, 0, 0.725)',
        },
      };


    
    return(

        <> 
        <div className="user" >
            <div id="userPerfil">
                <img id="userImg" src={data.img} alt={`Perfil do user ${data.name}`} />
                <div id="userInfo">
                    <p id="userName"> {data.name}</p>
                    <p id="userAcount">ID:{data.id} - Username{data.username} </p>
                </div>

            </div>

            <button id="button" onClick={()=> setModalPay(true)}>Pagar</button>

        </div>
        <Modal
        isOpen={modalPayOpen}
        style={customStyles}
        onRequestClose={onClose}
        >




        <div className="payment">
            <div className="payment_header"><p>Pagamento para <span>{data.name}</span></p></div>
            <div className="payment_container">

                <input id="payment_value" type="text" 
                placeholder="R$0,00" 
                required 
                maxLength={14} 
                minLength={1} />

                <select id="payment_card">
                    <option disabled value={''}>Escolha um cartao </option>
                    <option value="1111111111111111">Cartao com final 1111</option>
                    <option value="4111111111111234">Cartão com final 1234</option>

                </select>

                <button id="payment_button">Pagar</button>
            </div>
        </div>
        </Modal>
        </>
    )
}