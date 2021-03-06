import {get} from 'svelte/store'
import {allIncomes, incomes, incomesDatabaseName, incomesSum} from '$lib/stores/incomesStore'
import { selectedMonth, selectedYear } from '$lib/stores/datesStore';
import { userbase } from '$lib/stores/userbaseStore';

const openIncomesDatabase = () => {
    try {
        return userbase.openDatabase({ databaseName: get(incomesDatabaseName), changeHandler: function (items) {
            allIncomes.set(items);
            setIncomes(items)
        }
    })
    } catch(e) {
        return console.log(e);
    }     
}

const setIncomes = (items) => {
    // sorts the incomes based on date and timestamp
    let incomesForMonth = [];
    items.forEach(item => {
        const date = item.item.date;
        const year = Number(date.slice(0,4));
        const month = Number(date.slice(5, 7));
        if (year === get(selectedYear) && month === get(selectedMonth)) {
            incomesForMonth =[...incomesForMonth, item];
        }
    })
    let a = incomesForMonth;
    a.sort(function (a,b) {
        return (
            // @ts-ignore
            new Date(b.item.date) - new Date(a.item.date) ||
            // @ts-ignore
            new Date(b.createdBy.timestamp) -
            // @ts-ignore
            new Date(a.createdBy.timestamp)
        );
    })
    incomes.set(a);

    // sets the income sum
    let totalIncomes = [];
    get(incomes).forEach((income) => {
        totalIncomes = [...totalIncomes, income.item.amount];
    });
    incomesSum.set(totalIncomes.reduce(function (a, b) {
        const sum = a + b;
        const trimmed = Number(sum.toFixed(2));
        return trimmed;
    }, 0));
}

const addIncome = (income) => {
    try {
        return userbase.insertItem({ databaseName: get(incomesDatabaseName), item: income });
    } catch (e) {
        return e;
    }
};

const updateIncome = (income, incomeId) => {
    try {
       return userbase.updateItem({ databaseName: get(incomesDatabaseName), item: income, itemId: incomeId }); 
    } catch (e) {
        return e;
    }
};

const deleteIncome = (incomeId) => {
    try {
        return userbase.deleteItem({ databaseName: get(incomesDatabaseName), itemId: incomeId });
    } catch (e) {
        return e;
    }
}

export {openIncomesDatabase, addIncome, updateIncome, deleteIncome}