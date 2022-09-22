import  {useEffect, useState} from 'react';
import user from './interfaces/user';
import { UserProfile } from './components/profile';
import './css/App.css';

function App() {

  const [users, setUser] = useState([])

  useEffect(() => {
    // Coletando as contas dos clientes
    fetch('https://www.mocky.io/v2/5d531c4f2e0000620081ddce')
      .then((resp) => resp.json())
      .then((data) => setUser(data))
      .catch((erro) => console.log(erro));
  }, []);
  console.log(users)

  return (
    <div className="App">
      
      {/* informações dos clientes */}
      {users.map((acount:user) =>(
        <UserProfile
        key={'userprofile-'+acount.id}
        name={acount.name}
        id={acount.id}
        username={acount.username}
        img={acount.img}
        />
      ) )}
      
    </div>
  );
}

export default App;
