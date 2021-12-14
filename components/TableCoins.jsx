import CoinRow from "./CoinRow"
import styles from "../styles/TableCoins.module.css"
const TableCoins = ({coins,search}) => {
    const filteredCoins=coins.filter(coin=>
        coin.name.toLowerCase().includes(search.toLowerCase())
        ||
        coin.symbol.toLowerCase().includes(search.toLowerCase(  ))
        )
    return (
        <table className={styles.table_coins_container}>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Criptomoneda</td>
                    <td>Precio</td>
                    <td className={styles.td_no_importante}>Capitalización de mercado</td>
                    <td className={styles.td_no_importante}>Volumen 24h</td>
                    <td className={styles.td_no_importante}>24h %</td>
                    <td className={styles.td_no_importante}>Suplemento</td>
                </tr>
            </thead>
            <tbody>
                {filteredCoins.map((coin,id)=>(
                <CoinRow key={id} id={id+1} coin={coin}/>
                ))}
            </tbody>
        </table>
    )
}
export default TableCoins
