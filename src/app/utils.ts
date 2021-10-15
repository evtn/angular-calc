

type CalcFunction = (distance: number, age: number, bagWeight: number) => number[];

type AgeDiscount = {
    age: number, // max age for a discount
    percent: number, // discount percent as a number from 0 to 1
}

type BagPlan = {
    free: number, // maximum free weight
    max: number, // maximum weight overall
    price: number, // price per kg or fixed
    isFixed: boolean, 
}

export type Plan = {
    name: string,
    func: CalcFunction
}

type Company = {
    name: string,
    plans: Plan[]
}

function makePlan(kmPrice: number, ageDiscount: AgeDiscount, bagPlan: BagPlan): CalcFunction {
    return (distance, age, bagWeight) => {
        if (bagWeight > bagPlan.max) {
            return [NaN, NaN];
        }
        
        let bagPrice = 0;
        if (bagWeight > bagPlan.free) {
            bagPrice = bagPlan.isFixed ? bagPlan.price : (bagWeight - bagPlan.free) * bagPlan.price
        }

        let price = distance * kmPrice;
        if (age < ageDiscount.age) {
            price *= 1 - ageDiscount.percent;
        }

        return [price + bagPrice, distance * kmPrice + bagPrice];
    }
}

const noDiscount = {age: 0, percent: 0}

export const companies: Company[] = [
    {
        name: "Аэрофлот",
        plans: [
            {
                name: "Эконом", 
                func: makePlan(
                    4, 
                    noDiscount, 
                    {free: 5, max: 20, price: 4000, isFixed: true}
                )
            },
            {
                name: "Продвинутый", 
                func: makePlan(
                    8, 
                    {age: 7, percent: 0.3}, 
                    {free: 20, max: 50, price: 5000, isFixed: true}
                )
            },
            {
                name: "Люкс", 
                func: makePlan(
                    15,
                    {age: 16, percent: 0.3},
                    {free: 50, max: 50, price: 0, isFixed: true}
                )
            },
        ],
    },
    {
        name: "РЖД",
        plans: [
            {
                name: "Эконом", 
                func: makePlan(
                    0.5, 
                    noDiscount, 
                    {free: 15, max: 50, price: 50, isFixed: false}
                )
            },
            {
                name: "Продвинутый", 
                func: makePlan(
                    2, 
                    {age: 7, percent: 0.3}, 
                    {free: 20, max: 60, price: 50, isFixed: false}
                )
            },
            {
                name: "Люкс", 
                func: makePlan(
                    4,
                    noDiscount,
                    {free: 60, max: 60, price: 0, isFixed: true}
                )
            },
        ],
    }
];;
