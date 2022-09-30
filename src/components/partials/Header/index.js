import React from 'react';
import { HeaderArea} from './styled';
import { Link } from 'react-router-dom';
import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {
    let logged = isLogged ()

    const handledLogout = () =>{
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                    <span className="logo-1">O</span>
                    <span className="logo-2">L</span>
                    <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to= "/my-account"> Minha conta</Link>
                                </li>
                                <li>
                                    <button onClick={handledLogout}> Sair</button>
                                </li>
                                <li>
                                    <Link to= "/post-an-ad" className="button"> Postar um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to= "/signin"> Login</Link>
                                </li>
                                <li>
                                    <Link to= "/signup"> Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to= "/signin" className="button"> Postar um anúncio</Link>
                                </li>
                            </>
                        }
                      
                    </ul> 
                </nav>
            </div>
        </HeaderArea>
    )
}

export default Header