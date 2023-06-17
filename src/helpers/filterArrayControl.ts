
export const filterArrayControl = (item: any, oldArray: any[]): any[] => {
    const itemIndex = oldArray.indexOf(item);
    const newArray = [...oldArray];

    if (itemIndex !== -1) {
        newArray.splice(itemIndex, 1); // Remove item from array
    } else {
        newArray.push(item); // Add item to array
    }

    return newArray;
}