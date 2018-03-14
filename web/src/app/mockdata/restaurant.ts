import { Violation, Inspection, Restaurant } from '../models/restaurant'

export const RESTAURANT: Restaurant = {
    id: 2323423, 
    name: 'Dunkin Donuts',
    streetNumber: '33', 
    street: 'Anywhere Street',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11206',
    phoneNumber: '718-890-3833', 
    cuisineDescription: 'Bakery',
    score: 10,
    grade: 'A',
    closed: false,
    inspections: [ 
        { date: new Date('2015-05-01T05:00:00.000Z'), score: 7, grade: 'A', 
        violations: [ { code: '3728377', description: 'Food contact surface not properly washed', criticalFlag: false }]},
        { date: new Date('2016-04-01T05:00:00.000Z'), score: 5, grade: 'B', 
        violations: [ 
            { code: '3728377', description: 'Food contact surface not properly washed', criticalFlag: false },
            { code: '933843', description: 'Facility not vermin proof', criticalFlag: true }
        ]},
        { date: new Date('2017-06-14T05:00:00.000Z'), score: 10, grade: 'A', violations: []}        
    ]
}
