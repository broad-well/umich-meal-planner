import { Component } from 'inferno'
import * as API from './api.js'
import { dateString } from './util.js'

const panelStyles = {
    display: 'grid',
    'grid-template-columns': '1fr 2fr',
    gap: '8px',
    'font-size': '1.2rem',
    'text-align': 'right'
}

const selectStyles = {
    'font-size': '1rem',
    'border': 'none',
    padding: '4px',
    'border-radius': '4px'
}

const buttonStyles = {
    margin: '12px',
    'font-size': '1.1rem',
    color: 'white',
    'background-color': '#1aa3b0',
    border: 'none',
    padding: '8px',
    'border-radius': '4px',
    'font-family': 'Inter, "Helvetica Neue", "Segoe UI", sans-serif'
}

export default class ControlPanel extends Component {

    constructor(settings) {
        super(settings)
    }

    render() {
        const settings = this.props
        if (settings == null) return <></>
        return <div style={{'text-align': 'center'}}>
            <div id="controlPanel" style={panelStyles}>
                <label for="input-date">Date</label>
                <input type="date" name="Date"
                    id="input-date"
                    value={dateString(settings.date)}
                    max={dateString(new Date(settings.date.getTime() + 1000*60*60*24*7))}
                    min="2020-01-01"
                    onChange={e => settings.set('date', e.target.value)} />

                <label for="input-hall">Dining Hall</label>
                <select id="input-hall" style={selectStyles} onChange={e => settings.set('hall', e.target.value)}>
                    {API.diningHalls.map(it => <option value={it.name}>{it.name}</option>)}
                </select>

                <label for="input-meal">Meal</label>
                <select id="input-meal" style={selectStyles} onChange={e => settings.set('meal', e.target.value)}>
                    {API.availableMeals(settings.date).map(it => <option value={it}>{it}</option>)}
                </select>
            </div>
            <button style={buttonStyles}>Get Menu</button>
        </div>
    }
}