import { Component } from 'inferno'
import * as API from './api.js'
import { dateFromString, dateString } from './util.js'

const panelStyles = {
    display: 'grid',
    'grid-template-columns': '1fr 2fr',
    gap: '8px',
    'text-align': 'right'
}

const selectStyles = {
    'border': 'none',
    padding: '4px',
    'font-size': '0.9rem',
    'border-radius': '4px'
}

export const buttonStyles = {
    cursor: 'pointer',
    margin: '12px',
    'font-size': '1rem',
    color: 'white',
    'background-color': '#555555',
    border: 'none',
    padding: '6px',
    'border-radius': '3px',
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
            <div id="controlPanel">
                <select id="input-meal" style={selectStyles} onChange={e => settings.set('meal', e.target.value)}>
                    {API.availableMeals(settings.date).map(it => <option value={it}>{it}</option>)}
                </select>
                at
                <select id="input-hall" style={selectStyles} onChange={e => settings.set('hall', e.target.value)}>
                    {API.diningHalls.map(it => <option value={it.name}>{it.name}</option>)}
                </select>
                on
                <input type="date" name="Date"
                    id="input-date"
                    value={dateString(settings.date)}
                    max={dateString(new Date(settings.date.getTime() + 1000*60*60*24*7))}
                    min="2020-01-01"
                    onInput={e => settings.set('date', dateFromString(e.target.value))} />
            </div>
            <button style={buttonStyles} onClick={settings.getMenu}>Get Menu</button>
        </div>
    }
}