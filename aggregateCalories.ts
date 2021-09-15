interface MenuCategory {
    name: string
    menuItem: MenuItem[]
}

interface MenuItem {
    allergens: string[]
    attribute: string[]
    itemSizes: ItemSize[]
    name: string
}

interface ItemSize {
    nutritionalInfo: NutritionalInfoRow[]
    portionSize: number
    servingSize: string
}

interface NutritionalInfoRow {
    name: string
    value?: number
    units: string
    percentDailyValue: number
}

const res = await fetch('https://michigan-dining-api.tendiesti.me/v1/menus?date=2021-09-13&diningHall=Bursley%20Dining%20Hall&meal=LUNCH')
const js: any = await res.json();

console.log(Object.fromEntries((js.menus[0].category as MenuCategory[]).map(
    ({name, menuItem}) => [
        name.trim(),
        Object.fromEntries(menuItem.filter(item => item.itemSizes[0].nutritionalInfo != undefined).map(item =>
            [item.name.trim(), item.itemSizes[0].nutritionalInfo.filter(
                info => info.name === 'Calories')[0].value!]))])))
