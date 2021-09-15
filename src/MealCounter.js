/**
 * @param {{meal: [string, number][]}} props
 */
export default function MealCounter(props) {
    const totalCalories = props.meal.map(it => it[1]).reduce((a, b) => a + b, 0)
    const styles = {
        padding: '12px',
        'border-radius': '6px',
        'background': '#eeeeee',
        'font-size': '3rem',
        'font-family': 'Menlo, Consolas, monospace'
    }
    return <div style={styles}>{totalCalories}</div>
}