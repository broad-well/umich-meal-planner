
function pad(str, width) {
    return str.length >= width ? str : pad(str + ' ', width)
}

export default function MenuSection({ items, meal, onSelect, onDeselect }) {
    const itemSelected = itemName => meal.filter(it => it[0] === itemName).length > 0
    return <ul style={{'list-style': 'none', 'padding-inline-start': '4px'}}>
        {Object.entries(items).sort((a, b) => b[1] - a[1]).map(([name, calories]) => 
        <li>
            <pre style={{display: 'inline'}}>{pad(calories.toString(), 4)}</pre>
            <input type="checkbox" id={Buffer.from(name).toString('base64')} style={{width: '1rem', height: '1rem'}}
                checked={itemSelected(name)}
                onChange={(e) => e.target.checked ? onSelect([name, calories]) : onDeselect([name, calories])} />&nbsp;
            <label for={Buffer.from(name).toString('base64')}>{name}</label>
        </li>)}
    </ul>
}