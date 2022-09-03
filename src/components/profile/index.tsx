import user from "../../interfaces/user"

export const UserProfile = (data:user) => {

    return(

        <div className="user">
            <img id="userImg" src={data.img} alt={`imagem do user ${data.name}`} />
            <div id="userInfo" className="user_info">
                <p id="userName"> {data.name}</p>
                <p id="userAcount">ID:{data.id} - Username{data.username} </p>
            </div>

            <button id="button">Pagar</button>
        </div>
    )
}