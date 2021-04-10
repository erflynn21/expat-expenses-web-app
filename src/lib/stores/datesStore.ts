import {writable} from 'svelte/store';
import { get } from "svelte/store";
import {monthsDict} from './dictionariesStore';

const startDate = writable('');
const endDate = writable('');
const currentDate = writable(0)
const selectedMonth = writable(0);
const selectedYear = writable(0);
const selectedMonthName = writable('');

// getting current date
const date = new Date();
const currentYear = date.getFullYear();
let currentMonth = 0;
if (date.getMonth() + 1 >= 10) {
    currentMonth = date.getMonth() + 1;
} else {
    currentMonth = (Number('0' + (date.getMonth() + 1)));
}

let today = 0;
if (date.getDate() >= 10) {
    today = date.getDate();
} else {
    today = (Number('0' + date.getDate()));
}

const start = currentYear + '-' + currentMonth + '-01';
const end = currentYear + '-' + currentMonth + '-' + today;

startDate.set(`${start}`);
endDate.set(`${end}`);
currentDate.set(today);
selectedMonth.set(Number(currentMonth));
selectedYear.set(Number(currentYear));
selectedMonthName.set(monthsDict[get(selectedMonth) - 1]);

export {startDate, endDate, currentDate, selectedMonth, selectedYear, selectedMonthName}