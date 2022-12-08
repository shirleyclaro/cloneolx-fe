import React,{useState, useEffect} from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { useLocation, useHistory } from 'react-router-dom';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

let timer;
function Page() {
    const api = useApi ();
    const history = useHistory();

    const UseQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = UseQueryString();
    // valor da pesquisa
    const [q, setQ] = useState(query.get("q") == null ? queueMicrotask.get("q") : "");
    // valor da categoria
    const [cat, setCat] = useState(query.get("cat") == null ? query.get("cat") : "");
    // valor do estado
    const [state, setState] = useState(query.get("state") == null ? query.get("state") :
    "");

    //Montando a url para pesquisa
    useEffect (() => {
        let queryString = []
        if (q) {
            queryString.push(`q=${q}`)
        }
        if (cat) {
            queryString.push(`cat=${cat}`)
        }
        if (state) {
            queryString.push(`state=${state}`)
        }
        history.replace ({
            search: `?${queryString.join('&')}`
        })

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1000);
        setResult0pacity(0.3);
        setCurrentPage(1)
    }, [q, cat, state]);


    const [currentPage, setCurrentPage] = useState(1);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState ([]);
    const [result0pacity, setResult0pacity] = useState (1);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState (0);
    const [warningMessage, setWarningMessage] = useState ("Carregando...");
    const [loading, setLoading] = useState (true);

    const getAdsList = async () => {
        setLoading(true)
        let offset = 0;
        offset = (currentPage - 1) * 9
        const Ads = await api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state,
            offset
        });
        setAdList(Ads.ads)
        setAdsTotal(Ads.total)
        setResult0pacity(1);
        setLoading(false)
    }    

    useEffect(() => {
        if (adsTotal > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length))
        } else {
            setPageCount(0)
        }
    }, [adsTotal]);

    useEffect(() => {
        setResult0pacity(0.3);
        getAdsList()
    }, [currentPage]);

    useEffect(() => {
        const getStates = async () => {
            const states = await api.getStates ();
            setStateList (states)
        }
        getStates()
    }, []);

    useEffect (() => {
        const getCategories = async () => {
            const categories = await api.getCategories;
            setCategories(categories)
        }
        getCategories()
    }, []);

    let pagination = [];
    for (let i = 0; i < pageCount; i++) {
        pagination.push(i + 1);
    }

    return(
        <PageContainer>
        </PageContainer>
    )
}

export default Page