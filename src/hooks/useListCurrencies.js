import React,{useEffect, useState} from 'react'
import axios from 'axios';

export const useListCurrencies = () => {
   const REACT_API_URL_DESA = "http://10.128.49.125:5000/recaudosApi";
    // const REACT_API_URL_DESA = "https://emergencia24horas.segurospiramide.com/node/express/servicios/api";


    const [listCurrencies, setListCurrencies] = useState([])
    const [moneda, setMoneda] = useState('DL')

    //get list currencies
    useEffect(() => {
        //********************************************* */
        const source = axios.CancelToken.source();
        let isMounted = true;
        //********************************************* */
        try {

            const getListCurrencies = async () => {

                const resListCurrencies = await axios.post(
                    `${REACT_API_URL_DESA}/ListaMonedas`,
                    // { ...value, "cCodMoneda": "DL" }, 
                    { cancelToken: source.token }
                )

                if (isMounted) setListCurrencies(resListCurrencies.data)

            }
            getListCurrencies()

        } catch (error) {
            if (!isMounted) return; // comp already unmounted, nothing to do
            if (axios.isCancel(error)) console.log(error);
            else console.log(error);
        }
        //cancelando subscripciones
        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [])

    const handleChangeMoneda = (e) => {
        setMoneda(e.target.value)
        // setListCurrencies(resListCurrencies)
    }

    return {
        listCurrencies,
        moneda,
        setMoneda,
        handleChangeMoneda
    }
}
