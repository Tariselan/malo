/*
23 letters
1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n
*/
import imports from './JSON/imports.json' assert {type: 'json'};
const imported = imports;

const letterMap = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"]
const scriptMap = ["lat", "cyr", "ipa"];
let targetElement;

import letters from './JSON/letter.json' assert {type: 'json'};
const letter = letters;

const body = document.body;

function parse(input, scriptNum) {
    let inputArray = input.split("");
    let output = [];
    inputArray.forEach(element => {
        let convertedInput = letter[element];
        if (convertedInput) {
            // Check if the element is found in the letter object
            output.push(convertedInput[scriptMap[scriptNum]]);
        } else if (element == " ") {
            output.push(" ");
        } else if (element == ".") {
            output.push(".");
        } else if (element == ",") {
            output.push(",");
        }
        else {
            // Handle the case where the element is not found
            console.log(`Character '${element}' not found in the letter object.`);
        }
    });
    return output.join("");
}

// Loop through each span and log its innerHTML
for (var i = 0; i < document.getElementsByTagName('span').length; i++) {
    let text = document.getElementsByTagName('span')[i].innerHTML;
    let text_lat = parse(text, 0);
    let text_cyr = parse(text, 1);
    document.getElementsByTagName('span')[i].innerHTML = text_lat + '<br>' + text_cyr;
}
let map = new Map();

letterMap.forEach(LETTER => {
    scriptMap.forEach(script => {
        let array = [];
        array.push(LETTER);
        array.push(script);
        map.set(array, String.fromCharCode((letter[LETTER][script]).replace("&#", "").replace(";","")))
    })
})
const tableData = Array.from(map, ([array, entry]) => {
    const itemColumns = array.map((val, index) => ({ [`Item${index + 1}`]: val }));
    const combinedColumns = Object.assign({}, ...itemColumns, { Entry: entry });
    return combinedColumns;
  });
// Print the table
console.table(tableData);

//
const consonant_place = ["Labial", "Coronal", "Palatal", "Velar", "Uvular"];
const consonant_manner = ["Nasal", "Plosive", "Fricative", "Approximant"];

const vowel_back = ["Front", "Back"];
const vowel_height = ["Close", "Open-Mid", "Open"];

const letter_map = new Map([
    [11, letter["1"]],
    [12, letter["7"]],
    [13, letter["e"]],
    [14, letter["g"]],
    [21, letter["4"]],
    [22, letter["3"]],
    [23, letter["8"]],
    [24, letter["9"]],
    [26, letter["i"]],
    [27, letter["h"]],
    [28, letter["j"]],
    [31, letter["2"]],
    [32, letter["6"]],
    [33, letter["m"]],
    [35, letter["n"]],
    [42, letter["5"]],
    [111, letter['a']],
    [112, letter['b']],
    [113, letter['l']],
    [121, letter['c']],
    [122, letter['d']],
    [123, letter['k']],
    [134, letter['f']]
]);

const letter_map_IPA = new Map();
const letter_map_lat = new Map();
const letter_map_cyr = new Map();
letter_map.forEach((value, key) => {
    letter_map_IPA.set(key, value["ipa"]);
    letter_map_lat.set(key, value["lat"]);
    letter_map_cyr.set(key, value["cyr"]);
});

// Function to generate the table
function generateTable(rows, columns, type) {
    if (type == "consonant") {
        // Create a table element
        var table = document.createElement('table');
        table.id = "consonant_table";
        // Create the first row with all th elements
        var headerRow = document.createElement('tr');
        for (var i = 0; i < columns; i++) {
            var th = document.createElement('th');
            if (i) {
                th.textContent = consonant_place[i-1];
            }
            if (i == 1 || i == 2 || i == 4) {
                th.colSpan = 2;
            }
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (var i = 1; i < rows; i++) {
            var row = document.createElement('tr');
            // First item as th
            var th = document.createElement('th');
            th.style.width = "100px";
            th.textContent = consonant_manner[i - 1];
            row.appendChild(th);
            // Remaining items as td
            if (i !=2  && i != 3) {
                for (var j = 1; j < columns; j++) {
                    var td = document.createElement('td');
                    let k = (i)*10+(j);
                    if (letter_map_IPA.get(k) != undefined) {
                        td.innerHTML = '&langle;' + letter_map_cyr.get(k) + ' / ' + letter_map_lat.get(k) + '&rangle;  ' + '[' + letter_map_IPA.get(k) + ']';
                    }
                    if (j == 1 || j == 2 || j == 4) {
                        td.colSpan = 2;
                    }
                    row.appendChild(td);
                }
                table.appendChild(row);
            } 
            else if (i == 2) {
                for (var j = 1; j < columns + 3; j++) {
                    var td = document.createElement('td');
                    let k = (i)*10+(j);
                    if (letter_map_IPA.get((i)*10+(j)) != undefined) {
                        td.innerHTML = '&langle;' + letter_map_cyr.get(k) + ' / ' + letter_map_lat.get(k) + '&rangle;  ' + '[' + letter_map_IPA.get(k) + ']';
                    }
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
            else {
                for (var j = 1; j < columns + 1; j++) {
                    var td = document.createElement('td');
                    let k = (i)*10+(j);
                    if (letter_map_IPA.get((i)*10+(j)) != undefined) {
                        td.innerHTML = '&langle;' + letter_map_cyr.get(k) + ' / ' + letter_map_lat.get(k) + '&rangle;  ' + '[' + letter_map_IPA.get(k) + ']';
                    }
                    if (j == 1 || j == 5) {
                        td.colSpan = 2;
                    }
                row.appendChild(td);
                }
                table.appendChild(row);
            }
        }
        
    }
    else if (type == "vowel") {
        // Create a table element
        var table = document.createElement('table');
        table.id = "vowel_table";
        // Create the first row with all th elements
        var headerRow = document.createElement('tr');
        for (var i = 0; i < columns - 2; i++) {
            var th = document.createElement('th');
            th.textContent = vowel_back[i-1];
            if (i) {
                th.colSpan = 2;
            }
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (var i = 1; i <= rows; i++) {
            var row = document.createElement('tr');
            var th = document.createElement('th');
            th.textContent = vowel_height[i-1];
            th.style.width = "100px";
            row.appendChild(th);
            if (i != 3) {
                for (var j = 1; j <= columns - 2; j++) {
                    var td = document.createElement('td');
                    let k = 100 + (i * 10) + j;
                    if (letter_map_IPA.get(k) !== undefined) {
                        td.innerHTML = '&langle;' + letter_map_cyr.get(k) + ' / ' + letter_map_lat.get(k) + '&rangle;  ' + '[' + letter_map_IPA.get(k) + ']';
                    }
                    if (j)
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
            else {
                var td = document.createElement('td');
                td.colSpan = 3;
                let k = 100 + (i * 10) + j;
                if (letter_map_IPA.get(k) !== undefined) {
                    td.innerHTML = '&langle;' + letter_map_cyr.get(k) + ' / ' + letter_map_lat.get(k) + '&rangle;  ' + '[' + letter_map_IPA.get(k) + ']';
                }
                row.appendChild(td);
                table.appendChild(row);
            }
        }
    }
    targetElement.appendChild(table);
}

// Call the function with the desired number of rows and columns
function tableButtonGenerate(id) {
    // Use the external targetElement variable directly
    targetElement = document.getElementById(id);
    generateTable(5, 6, "consonant");
    document.body.append(document.createElement('br'));
    generateTable(3, 5, "vowel");
}
