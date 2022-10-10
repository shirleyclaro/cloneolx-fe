import styled from 'styled-components';

export const Item = styled.div `
    a {
        display: block;
        border: 1px solid #ccc;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        background-color: #fff;
        transition: all ease 0.2s;

        &:hover {
            background-color: #d9ffcc;
            border: 1px solid #b3ff99;
        }

        .itemImage img{
            width: 100%;
            border-radius: 5px;
        }

        .itemName{
            font-weight: bold;
        }
    }
`;