

type ColoredMoneyProps = {
    value : number
}

const ColoredMoney = (props : ColoredMoneyProps) => {
    
    const {value} = props;

    if(value > 99_999 && value < 9_999_999){
        return <span style={{color: "#FFFFFF"}}>{value / 1000}K sats</span>
    }
    else if(value > 10_000_000){
        return <span style={{color: "#00FF80"}}>{value / 1_000_000}M sats</span>
    }

    return <span style={{color: "#FFFF00"}}>{value} sats</span>;

}

export default ColoredMoney;