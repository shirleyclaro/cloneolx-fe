import React,{useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import {
     PageContainer, 
     PageTitle,
     ErrorMessage 
} from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';

const Page = () => {
    const api = useApi ();
    const history = useHistory ();

    const fileField = useRef ();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [priceNegotiabled, setPriceNegotiabled] = useState (false);
    const [description, setDescription] = useState ('');
    const [disabled, setDisabled ] = useState (false);
    const [error, setError] = useState ('');

    useEffect(()=>{
        const getCategories = async () => {
            const sCats = await api.getCategories();
            setCategories (sCats);
        }
        getCategories();
    }, []);

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()) {
            errors.push("Título é obrigatório");
        }
        if(!category.trim()) {
            errors.push("É necessário informar uma categoria");
        }

        if(errors.length===0) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price",price);
            formData.append("priceneg", priceNegotiabled);
            formData.append("desc", description);
            formData.append("cat", category);

            if(fileField.current.files.length > 0) {
                for (let i=0; i < fileField.current.files.length; i++) {
                    formData.append("img", fileField.current.files[i]);
            }
        }
            const response = await api.addAd(formData);

            if(!response.error){
                history.push(`/ad/${response.id}`);
                return;

            }else {
                setError(response.error);
            }

        

        }else {
            setError(errors.join("\n"));
        }
        
        setDisabled(false);
    }

    return(
        <PageContainer>
            <PageTitle>
                Postar Anúncio
            </PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSumit={handleSubmit}>
                <label className="area">
                        <div className="area--title">
                            Título
                        </div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Categoria
                        </div>
                        <div className="area--input">
                            <select
                                required
                                disabled = {disabled}
                                onChange={e => setCategory(e.target.value)}
                            >   
                                <option></option>
                                {categories && categories.map((catego)=>
                                    <option
                                        key={catego._id}
                                        value={catego._id}
                                    >
                                        {catego.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço
                        </div>
                        <div className="area--input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder= "R$ "
                                disabled={disabled || priceNegotiabled}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço Negociável
                        </div>
                        <div className="area--input">
                            <input
                                className="check"
                                type="checkbox" 
                                disabled={disabled}
                                onChange={e => setPriceNegotiabled(!priceNegotiabled)}
                                checked= {priceNegotiabled}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Descricao
                        </div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Imagens (1 ou mais)
                        </div>
                        <div className="area--input">
                            <input
                                type="file"
                                disabled={disabled}
                                value={description}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                        </div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page