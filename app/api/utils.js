const fs = require("fs");
const { parse } = require("csv-parse");

const readFromFile = async () => {
    let files = []
    return new Promise(function (resolve, reject) {
        fs.createReadStream("data.csv")
            .pipe(parse({ delimiter: ",", from_line: 1 }))
            .on("data", function (row) {
                const fields = row[0].split(";")
                files.push({
                    createdAt: fields[0],
                    filename: fields[1]
                })
                resolve(files)
            })
            .on("error", function (error) {
                reject(error.message)
            });
    });
}
const readFromUrl = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/manasnisar/su-fsd/main/data.csv', {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        });

        let data = await res.text();
        data = data.split("\n")
        const files = data.map(item => {
            const fields = item.split(';')
            return {
                createdAt: fields[0],
                filename: fields[1]
            }
        })
        return files

    } catch (err) {
        console.log(err)
    }
}


const customSort = (items) => {
    return items.sort((a, b) => {
        const fileNameA = a.filename.split(".")[0]
        const fileNameB = b.filename.split(".")[0]

        // Remove leading zeros and split the strings into parts
        const partsA = fileNameA.replace(/^0+/g, '').split(/(\d+)/);
        if (partsA.length === 3) {
            partsA[1] = partsA[1].replace(/^0+/g, '')
        }

        const partsB = fileNameB.replace(/^0+/g, '').split(/(\d+)/);
        if (partsB.length === 3) {
            partsB[1] = partsB[1].replace(/^0+/g, '')
        }

        // Handle the case where the string starts with a number
        if (!isNaN(partsA[1]) && !isNaN(partsB[1]) && partsA[0] === '' && partsB[0] === '') {
            const numA = parseInt(partsA[1], 10);
            const numB = parseInt(partsB[1], 10);
            if (numA !== numB) {
                return numA - numB;
            }
        }

        // Compare the non-numeric parts
        const alphaComparison = partsA[0].localeCompare(partsB[0]);
        if (alphaComparison !== 0) {
            return alphaComparison;
        }

        // If the non-numeric parts are the same, compare the numeric parts
        const numA = parseInt(partsA[1], 10) || 0;
        const numB = parseInt(partsB[1], 10) || 0;
        return numA - numB;
    });
}

module.exports = {
    readFromFile,
    customSort,
    readFromUrl
}