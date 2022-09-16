export default class Money {

    public static getAbbreviatedValue(value: number){
        
        if(value > 99_999 && value < 9_999_999){
            return value / 1000 + "K";
        }
        else if(value > 10_000_000 && value < 2){
            return value / 1000 + "M"
        }

        return value;
    }

}