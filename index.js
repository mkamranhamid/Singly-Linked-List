console.log("Lets get started");

var arr = [];
var main = [
    { data: 11, next: 2 },
    { data: 22, next: 3 },
    { data: 33, next: 4 },
    { data: 44, next: 5 },
    { data: 55, next: 6 },
    { data: 66, next: 7 },
    { data: 77, next: 8 },
    { data: 88, next: 9 },
    { data: 99, next: 10 },
    { data: 00, next: null }
];
arrayInit(main);

function arrayInit(arr) {
    let arrayLength = document.getElementById('arrayLength');
    let isArrayEmpty = document.getElementById('isArrayEmpty');
    let avlPtr = document.getElementById('avlPtr');
    let llPtr = document.getElementById('llPtr');
    arrayLength.innerText = arr.length;
    isArrayEmpty.innerText = isEmpty(arr);
    avlPtr.innerText = (lookForAvailablity(arr) > -1) ? lookForAvailablity(arr) + 1 : 'null';
    llPtr.innerText = fetchFirstDataIndexForward(0) + 1;
    createBoxes(arr)
}

function fetchFirstDataIndexForward(index) {
    let firstFetchedIndex = null;
    let i = index;
    do {
        if (main[i].next != null) {
            firstFetchedIndex = i;
            break;
        }
        i++;
    }
    while (i < main.length - 1);
    return firstFetchedIndex;
}

function fetchFirstDataIndexBackward(index) {
    let firstFetchedIndex = null;
    let i = index;
    do {
        if (main[i].next != null) {
            firstFetchedIndex = i;
            break;
        }
        i--;
    }
    while (i >= 0);
    return firstFetchedIndex;
}

function lookForAvailablity(arr) {
    let indexOfNull = arr.findIndex((d, i) => {
        return (d.data === null);
    });
    return indexOfNull;
}

function nextAvailableNode(arr) {
    let indexOfNull = arr.findIndex((d, i) => {
        return ((d.next === null) && (arr.length - 1 != i));
    });
    return indexOfNull;
}

function insertIntoArray() {
    let numToAdd = document.getElementById('add-num').value;
    console.log("insertIntoArray");
    if (!numToAdd) {
        alert('Please enter a number to perform the selected action!!')
        return;
    }
    numToAdd = parseInt(numToAdd);
    let nextAvailableSpace = lookForAvailablity(main);
    if (nextAvailableSpace == -1) {
        alert('No space available to perform the selected action!!');
        showToggler('add-box');
        return;
    }
    main[nextAvailableSpace].data = numToAdd;
    arrayInit(main);
    showToggler('add-box');
    clearField('add-num');
    /*  if (parseInt(numToAdd) ) {
 
     }
     main[indx].push(main[indx].length);
     arrayInit(main[indx]); */
}

function clearField(id) {
    document.getElementById(id).value = '';
}

function updateArray() {
    let indexVal = document.getElementById('index-upd').value;
    let replacerVal = document.getElementById('replace').value;
    if (!indexVal || !replacerVal) {
        alert('Please enter a number to perform the selected action!!')
        return;
    }
    indexVal = parseInt(indexVal) - 1;
    if (parseInt(indexVal) > (main.length - 1)) {
        alert('Out of range!!')
        return;
    }
    main[indexVal].data = parseInt(replacerVal);
    arrayInit(main);
}

function maintainListNexts(index) {
    let slicedMainArr = main.slice();
    slicedMainArr[index - 1].next = (index + 1) + 1;
    main = slicedMainArr;
}

function deleteFromArray() {
    let indexVal = document.getElementById('index-dlt').value;
    indexVal = parseInt(indexVal) - 1;
    if (!main[indexVal]) {
        alert('Out of range!!');
        showToggler('delete-box');
        return;
    }
    if (typeof main[indexVal].data != 'number') {
        alert('Index is already empty!!');
        showToggler('delete-box');
        return;
    }
    main[indexVal].next = null;
    // maintainListNexts(indexVal);
    if (indexVal != 0) {
        let bwdIndex = fetchFirstDataIndexBackward(indexVal);
        main[bwdIndex].next = fetchFirstDataIndexForward(indexVal + 1) + 1;
    }
    arrayInit(main);
    showToggler('delete-box');
    clearField('index-dlt');
}

function searchInArray(indx) {
    console.log("deleteIntoArray");
    let indexVal = document.getElementById('srch').value;
    let indexOfBox = main[indx].indexOf(parseInt(indexVal));
    if (indexOfBox == -1) {
        alert("Can't find the searched key!!");
        return;
    }
    let boxes = document.getElementById('box-container').children;
    removeClassIfExist(boxes);

    let targetBox = boxes[indexOfBox];
    targetBox.classList.add('search-border');
}

function removeClassIfExist(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('search-border');
    }
}

function isEmpty(arr) {
    return arr.length > 0 ? false : true;
}

function createBoxes(arr) {
    let boxContainer = document.getElementById('box-container');
    let boxes = arr.map((d, i) => {
        let box = `<div class='box-wrap'><p>${i + 1}</p><div class="box"><div>${d.data}</div><div>${d.next}</div></div></div>`;
        return box;
    })
    boxes = boxes.join("");
    boxContainer.innerHTML = boxes;
}

function showToggler(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function createArray(indx) {
    let newArray = new Array(10).fill(0).map((d, i) => {
        return i;
    });
    main[indx] = newArray;
    arrayInit(main[indx]);
}



/* **Schema** */
/* 
    {
        arrs:[arr1,arr2,arr3,...];   //arr1=[1,2,3,4]
    }
*/

/* **Merge{arr1,arr2}** */
/* 
    {
        arrs:[arr1,arr3,...];
    }
*/