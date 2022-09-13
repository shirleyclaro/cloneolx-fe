import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundArea } from './styled'


const Page = () => {
    return (
        <NotFoundArea>
        <div className="container">
            <h2>Página não encontrada</h2>
        <div className= "botao">
            <Link to= '/'>Voltar para a Home</Link>
        </div>
        </div>
        </NotFoundArea>
    )
}

export default Page