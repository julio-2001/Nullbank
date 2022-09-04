import user from "../../interfaces/user"
import "./style.css"

export const UserProfile = (data:user) => {

    return(

        <div className="user">
            <div id="userPerfil">
                <img id="userImg" src={data.img} alt={`imagem do user ${data.name}`} />
                <div id="userInfo">
                    <p id="userName"> {data.name}</p>
                    <p id="userAcount">ID:{data.id} - Username{data.username} </p>
                </div>

            </div>

            <button id="button">Pagar</button>
        </div>
    )
}