import user from "../../interfaces/user"
import { useState} from "react"
import "./style.css"
import "../modals/index"
import "../modals/index"
import { UserCards } from "./cards"
import { valueFormat } from "./maskara"

import Modal from "react-modal"
import { Payment } from "../../interfaces/card"

Modal.setAppElement('#rootmodal')




export const UserProfile = (data:user) => {
    //modal de pagamento
    const [modalPayOpen, setModalPay] =  useState(false)

    // recibo de pagamento
    const [receiptOpen, setReceipt] = useState(false)

    //input do valor enviado
    const [inputPayment, setInputPayment]= useState('')

    //seleção do cartão
    const [selectCard, setSelecCard] = useState('')

    const[message, setMessage] = useState('')


    async function paymentLoading(data:any){
        data.preventDefault()

        const value:number = data.target[0].value
        const selectCard = data.target[1].value;
        
        const card = UserCards.find( (e) => e.card_number == selectCard );

        const aproved = card?.aproved
        console.log(data.target ,selectCard,card,value,aproved)
        
    
        const urlCard = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

        const cardInfo = await fetch(urlCard, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(card),
        });

        const cardData = await cardInfo.json();
       
        console.log(cardData['status'])
  
        if(cardData['status'] == aproved){
            setMessage(' O pagamento foi aprovado')
        }else{
            setMessage('O pagamento  NÃO  foi aprovado')
        }

        console.log((cardData))
        setModalPay(false)
        //abrira assim que a requesição for feita
        setReceipt(true)

    }
    
    


    //fechara o modal de pagamento
    function onClose(){
        setModalPay(false)
    }

    function onClosereceipt(){
        setReceipt(false)
    }


    //modal payment


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




        <form className="payment" onSubmit={paymentLoading}>
            <div className="payment_header"><p>Pagamento para <span>{data.name}</span></p></div>
            <div className="payment_container">

                <input id="payment_value" type="text" 
                placeholder="R$0,00" 
                required 
                onChange={(e) => setInputPayment(e.target.value)}
                maxLength={14} 
                minLength={1}
                inputMode='numeric'
                onKeyUp={valueFormat} 
                />

                <select id="payment_card"
                onChange={(e) => setSelecCard(e.target.value)}>

                    <option disabled value={''}>Escolha um cartao </option>
                    <option value={UserCards[0].card_number}>Cartao com final {UserCards[0].card_number.slice(-4)}</option>
                    <option value={UserCards[1].card_number}>Cartão com final {UserCards[1].card_number.slice(-4)}</option>

                </select>

                <button id="payment_button">Pagar</button>
            </div>
        </form>
        </Modal>

        <Modal
        isOpen={receiptOpen}
        onRequestClose={onClosereceipt}
        style={customStyles}
        >

            <div className="receiptResult">
                <div id="receiptHeader"><p>Recibo de pagamento</p></div>
                <p id="receipt">{message}</p>

            </div>

        </Modal>
        </>
    )
}