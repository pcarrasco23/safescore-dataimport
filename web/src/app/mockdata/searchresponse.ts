import { SearchResponseItem } from '../models/searchresponseitem';
import { SearchResponse } from '../models/searchresponse';

var searchResponseItems : SearchResponseItem[] = [
    { id: 2323423, name: 'Dunkin Donuts', city: 'QUEENS', zipCode: '11106', grade: 'A', closed: false },
    { id: 6544343, name: 'Jimmys Bakery', city: 'BROOKLYN', zipCode: '11216', grade: 'B', closed: false },
    { id: 1209323, name: 'Jeffs Sandiches', city: 'MANHATTAN', zipCode: '10003', grade: '', closed: true }
];

export const SEARCHRESPONSE : SearchResponse = { data: searchResponseItems, count: 3 };