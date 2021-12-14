import addCommas from "../helpers/addCommas.js"
import styles from "../styles/TableCoins.module.css"
const CoinRow = ({coin,id}) => {

    return (
        <>      
            <tr className={styles.tr_row} key={id}>
                <td>{id}</td>
                <td>
                    <div>
                        <img style={{height:"24px",width:"24px"}} src={coin.image} alt={coin.name} />
                        <span className={styles.coin_name}>{coin.name}</span>
                        <span className={styles.coin_symbol}>{(coin.symbol).toUpperCase()}</span>
                    </div>
                </td>
                <td>{`$${addCommas(coin.current_price)}`}</td>
                <td className={styles.td_no_importante}>{addCommas(coin.market_cap)}</td>
                <td className={styles.td_no_importante}>{`$${addCommas(coin.total_volume)}`}</td>
                {coin.price_change_percentage_24h>0?(
                    <td className={styles.td_no_importante}>
                        <span className={styles.up_color}>
                            {(coin.price_change_percentage_24h).toFixed(2)}%
                        </span>
                    </td>
                ):(
                    <td className={styles.td_no_importante}>
                        <span className={styles.down_color}>
                            {(Math.abs(coin.price_change_percentage_24h)).toFixed(2)}%
                        </span>
                    </td>
                )}
                <td className={styles.td_no_importante}>{addCommas(coin.circulating_supply)}</td>

            </tr>
        
        </>
    )
}

export default CoinRow
