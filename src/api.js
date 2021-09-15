import { dateString } from "./util"

export const diningHalls = [
    {
        name: 'Bursley'
    },
    {
        name: 'Mosher Jordan'
    },
    {
        name: 'North Quad'
    },
    {
        name: 'Markley'
    },
    {
        name: 'East Quad'
    },
    // {
    //     name: 'Martha Cook'
    // },
    {
        name: 'South Quad'
    },
    {
        name: 'Lawyers Club'
    }
]

/** @param {Date} date */
export function availableMeals(date) {
    const weekday = date.getDay()
    const isWeekend = weekday === 0 || weekday === 6
    return isWeekend ? [
        'Breakfast',
        'Brunch',
        'Dinner'
    ] : [
        'Breakfast',
        'Lunch',
        'Dinner'
    ]
}

/**
 * Fetch menu items for a given date in a given dining hall for a given meal.
 * @param {Date} date
 * @param {{name: string}} hall 
 * @param {string} meal
 * @returns {{[category: string]: {[itemName: string]: number}}}
 */
export async function fetchMenuItemsWithCalories(date, hall, meal) {
    const localISOTime = dateString(date)
    const res = await fetch(`https://michigan-dining-api.tendiesti.me/v1/menus?date=${localISOTime}&diningHall=${hall}%20Dining%20Hall&meal=${meal.toUpperCase()}`)
    const js = await res.json()
    
    return Object.fromEntries(js.menus[0].category.map(
        ({name, menuItem}) => [
            name.trim(),
            Object.fromEntries(menuItem.filter(item => item.itemSizes[0].nutritionalInfo != undefined).map(item =>
                [item.name.trim(), item.itemSizes[0].nutritionalInfo.filter(
                    info => info.name === 'Calories')[0].value]))]))
}

