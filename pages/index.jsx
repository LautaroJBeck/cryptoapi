import {useEffect,useState} from "react"
import TableCoins from "../components/TableCoins";
import styles from "../styles/Home.module.css"
import Head from "next/head"
export default function Home() {
  const [search,setSearch]=useState("")

  const [coins, setCoins] = useState([])
  const [generalData,setGeneralData]=useState({})
  const getCoinsData= async ()=>{
    let res= await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    let json= await res.json();
    console.log(json);
    setCoins(json);
  }
  const getGeneralData=async ()=>{
      let res = await fetch("https://api.coingecko.com/api/v3/global");
      let json = await res.json()
      console.log(json)
      let {market_cap_change_percentage_24h_usd, market_cap_percentage,total_volume}=json.data;
      setGeneralData({
          marketCapChange:market_cap_change_percentage_24h_usd,
          dominance:{
              dominanceBtc:market_cap_percentage.btc,
              dominanceEth:market_cap_percentage.eth
          },
          totalMarketCap:total_volume.usd,
      })

  }

  useEffect(() => {
    getCoinsData()
    getGeneralData()
  }, [])

  return (
      <>
      <div className={styles.header_container}>
        <Head>
        <title>Lautaro Beck-CryptoAPI</title>
        <link rel="icon" href="/img/Bitcoin-BTC-icon.png" />
        </Head>
          <h1>Crypto Market</h1>
      </div>
      <div className={styles.description_container}>
          <h2>Principales 100 criptomonedas por capitalización de mercado</h2>
          <p>La capitalización del mercado de las criptomonedas es de 
          
              <span style={{fontWeight:"600"}} > { 
              generalData.totalMarketCap?(
                  ` $${(generalData.totalMarketCap/100000000000).toFixed(2)}T, `
              ):(" $0, ")
              }</span>
              {generalData.marketCapChange<0?
              (`con un descenso de`)
              :
              (`con un aumento de`)
              }
              <span
              className={(generalData.marketCapChange>0)?`${styles.up_color}`:`${styles.down_color}`}
              >
              {generalData.marketCapChange?(
                  generalData.marketCapChange<0?(
                      ` ${(generalData.marketCapChange).toFixed(2)}%`
                  ):(
                      ` ${(generalData.marketCapChange).toFixed(2)}% `
                  )        
              )
              :
              (" 0% ")}
              </span>
              durante las últimas 24 horas
          </p>
          <p>
              En este preciso momento, la dominancia total de BTC es del 
              <span >
                  {generalData.dominance?` ${(generalData.dominance.dominanceBtc).toFixed(2)}% `:" 0%"}
              </span>
              mientras que la de ETH es del
              <span>
                  {generalData.dominance?` ${(generalData.dominance.dominanceEth).toFixed(2)}%`:" 0%"}
              </span>
          </p>
      </div>
      <input 
      placeholder="Busca una moneda" 
      type="text" 
      className={styles.input}
      onChange={(e)=>setSearch(e.target.value)}
      />

      <div className={styles.table_container}>
          <TableCoins search={search} coins={coins}/>
      </div>
      </>
 
      

  )
}
