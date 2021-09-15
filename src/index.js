// inferno module
import { Component } from 'inferno';
import { render } from 'inferno';
import ControlPanel, { buttonStyles } from './ControlPanel'
import MenuSection from './MenuSection'
import MealCounter from './MealCounter'
import * as API from './api'

const detailsStyles = {
  margin: '2px',
  background: 'rgba(0, 0, 0, 0.1)',
  padding: '8px',
  'border-radius': '4px'
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      settings: {
        date: new Date(),
        meal: 'Breakfast',
        hall: 'Bursley',
      },
      menu: {},
      meal: []
    }
  }

  setSettings(key, value) {
    this.setState({ ...this.state, settings: {
      ...this.state.settings,
      [key]: value
    }})
  }

  getMenu() {
    this.setState({ ...this.state, meal: [] })
    API.fetchMenuItemsWithCalories(this.state.settings.date, this.state.settings.hall, this.state.settings.meal).then(res => {
      this.setState({ ...this.state, menu: res })
    })
  }

  onSelect([name, calories]) {
    this.setState({ ...this.state, meal: [...this.state.meal, [name, calories]]})
  }

  onDeselect([name, _]) {
    this.setState({ ...this.state, meal: this.state.meal.filter(it => it[0] !== name)})
  }

  countInCategory(menu, category, meal) {
    return meal.filter(it => Object.keys(menu[category]).includes(it[0])).length
  }

  render() {
    const categoryDropdown = (state, [category, items]) => {
      const count = this.countInCategory(state.menu, category, state.meal)
      return <details style={detailsStyles}>
        <summary>{count === 0 ? '' : `(${count}) `}{category}</summary>
        <MenuSection items={items} meal={state.meal}
          onSelect={this.onSelect.bind(this)}
          onDeselect={this.onDeselect.bind(this)} />
      </details>
    }
    return <>
      <header>
        <ControlPanel {...this.state.settings}
          set={this.setSettings.bind(this)}
          getMenu={this.getMenu.bind(this)} />

      </header>
      <main>
        {Object.entries(this.state.menu).map(it => categoryDropdown(this.state, it))}
        {this.state.meal.length > 0 ?
          <button onClick={() => this.setState({ ...this.state, meal: []})} style={buttonStyles}>Clear Meal</button> : null}
      </main>
      <footer style={{position: 'fixed', right: '16px', bottom: '16px'}}>
        {this.state.meal.length > 0 ? <MealCounter meal={this.state.meal} /> : null}
      </footer>
    </>
  }
}

render(<App />, document.getElementById('app'));
