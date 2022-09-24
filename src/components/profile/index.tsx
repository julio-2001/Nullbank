import user from "../../interfaces/user"
import { useState} from "react"
import "./style.css"
import "../modals/index"
import "../modals/index"
import { UserCards } from "./cards"
import { valueFormat } from "./maskara"
import "../modals/"
import Modal from "react-modal"
import { isDisabled } from "@testing-library/user-event/dist/utils"
// import { card } from "../../interfaces/card"

Modal.setAppElement('#rootmodal')




export const UserProfile = (data:user) => {
    //modal de pagamento
    const [modalPayOpen, setModalPay] =  useState(false);

    // recibo de pagamento
    const [receiptOpen, setReceipt] = useState(false);

    //input do valor enviado
     // eslint-disable-next-line
    const [inputPayment, setInputPayment]= useState('');

    //seleção do cartão
     // eslint-disable-next-line
    const [selectCard, setSelecCard] = useState('');

    const[message, setMessage] = useState('');


    async function paymentLoading(dataCard:any, ){

        dataCard.preventDefault()
        console.log(dataCard)
        
        // valor informado para transação
        const value:number = dataCard.target[0].value;

        // cartao selecionado
        const selectCard = dataCard.target[1].value;
        
        // filtrara todos os cartão cadastrados e retorná o que foi escolhido
        const card = UserCards.find( (e) => e.card_number === selectCard );

        // verifica a situação do cartão
        const aproved = card?.aproved;
      
        
        const urlCard = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

        const cardInfo = await fetch(urlCard, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card_number:card?.card_number,
                cvv:card?.cvv,
                expiry_date:card?.expiry_date,
                value:value,
                destination_user_id:data.id,
            }),
        });
        console.log(`User id ${data.id}`)

        console.table(cardInfo)

        const cardData = await cardInfo.json();
    
  
        if(cardData['status'] === aproved){
            setMessage(' O pagamento foi aprovado');
        }else{
            setMessage('O pagamento  NÃO  foi aprovado');
        }

       
        setModalPay(false);
        //abrira assim que a requesição for feita
        setReceipt(true);

    }
    
    //fechara o modal de pagamento
    function onClose(){
        setModalPay(false);
    }

    //fechara o recibo
    function onClosereceipt(){
        setReceipt(false);
    }



    const customStyles = {
        //customização dos modais utilizados 
        content: {
            width:'100%',
            height:'50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '10px 50px 0px 100vh rgba(0, 0, 0, 0.725)',
            background:'none',
            border:'none',
        },
    };


    //modal payment e modal recibo
   

    return(
        <> 
        <div className="user" >
            <div id="userPerfil">
                <img id="userImg" src={data.img} alt={`Perfil do cliente ${data.name}`} />
                <div id="userInfo">
                    <p id="userName"> {data.name}</p>
                    <p id="userAcount">ID:{data.id} - Username{data.username} </p>
                </div>

            </div>

            <button id="button" onClick={()=> setModalPay(true)} >Pagar</button>

        </div>


        <Modal
        isOpen={modalPayOpen}
        style={customStyles}
        onRequestClose={onClose}
        >


        <form className="payment" onSubmit={paymentLoading}>

            <div className="payment_header">
                <p >Pagamento para: <span>{data.name}</span></p>
            </div>

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
                    <option value={UserCards[0].card_number}>Cartão com final {UserCards[0].card_number.slice(-4)}</option>
                    <option value={UserCards[1].card_number}>Cartão com final {UserCards[1].card_number.slice(-4)}</option>

                </select>

                <div className="payment_buttons">

                    <button id="payment_button"  >Pagar</button>
                    <button id="payment_cancel" onClick={()=>setModalPay(false)} >Cancelar</button>
                </div>

            </div>
        <span id="closePayment" onClick={()=>setModalPay(false)}></span>
        </form>
        </Modal>


        <Modal
        //modal de recibo
        isOpen={receiptOpen}
        onRequestClose={onClosereceipt}
        style={customStyles}
        >

            <div className="receiptResult">
                <div id="receiptHeader"><p>Recibo de pagamento</p></div>

                {/*Enviará a mensagem do recibo*/}
                <p id="receipt">{message}</p>

                <span id="closeReceipt" onClick={()=> setReceipt(false) } ></span>
            </div>

        </Modal>
        </>
    )
}