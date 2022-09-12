import styled from 'styled-components'

export const HeaderArea = styled.div`
        background-color: #FFF;
        height: 60px;
        border-bottom: 1px solid #CCC;


        .container{
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
        }

        a{
            text-decoration: none;
        }

        .logo{
            flex: 1;
            display: flex;
            align-items: center;
            height: 60px;
        }

        .logo-1,
        .logo-2,
        .logo-3{
            font-size: 27px;
            font-weight: bold;
        }

        .logo-1{ color: #00ff00;}
        .logo-2{ color: #0080ff;}
        .logo-3{ color: #ff0080;}

   
    `

    
