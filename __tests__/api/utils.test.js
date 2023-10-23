const chai = require('chai');
const { customSort } = require('../../app/api/utils.js'); // Replace with the actual path to your function

const expect = chai.expect;

// describe("readFromFile Tests", function () {
//   it("should read data from the CSV file", async function () {
//     const result = await readFromFile();
//     expect(result).to.be.an("array");
//     expect(result).to.have.lengthOf.at.least(1); // Ensure there's at least one item in the result
//   });
// });


describe('customSort Tests', () => {
  it('should sort files with alphanumeric names correctly', () => {

    const inputArray = [
      { createdAt: '2023-06-25 11:00', filename: '1abc.txt' },
      { createdAt: '2023-06-25 12:00', filename: 'abc.txt' },
      { createdAt: '2023-06-25 13:00', filename: '01abc.txt' },
      { createdAt: '2023-06-25 17:00', filename: '021-abc.txt' },
      { createdAt: '2023-06-25 14:00', filename: '0010abc.txt' },
      { createdAt: '2023-06-25 18:00', filename: '002-abc.txt' },
      { createdAt: '2023-06-25 15:00', filename: '011abc.txt' },
      { createdAt: '2023-06-25 16:00', filename: '20-abc.txt' },
      { createdAt: '2023-06-25 19:00', filename: 'cba.txt' },
      { createdAt: '2023-06-25 20:00', filename: 'abc010.txt' }
    ];
    const expectedArray = [
      { createdAt: '2023-06-25 11:00', filename: '1abc.txt' },
      { createdAt: '2023-06-25 13:00', filename: '01abc.txt' },
      { createdAt: '2023-06-25 18:00', filename: '002-abc.txt' },
      { createdAt: '2023-06-25 14:00', filename: '0010abc.txt' },
      { createdAt: '2023-06-25 15:00', filename: '011abc.txt' },
      { createdAt: '2023-06-25 16:00', filename: '20-abc.txt' },
      { createdAt: '2023-06-25 17:00', filename: '021-abc.txt' },
      { createdAt: '2023-06-25 12:00', filename: 'abc.txt' },
      { createdAt: '2023-06-25 20:00', filename: 'abc010.txt' },
      { createdAt: '2023-06-25 19:00', filename: 'cba.txt' }
    ];
    const sortedArray = customSort(inputArray);
    expect(sortedArray).to.deep.equal(expectedArray);
  });

  it('should handle strings without numeric prefixes', () => {
    const inputArray =
      [
        { filename: "abc" },
        { filename: "def" },
        { filename: "xyz" },
        { filename: "abcde" }
      ]
    const expectedArray = [
      { filename: "abc" },
      { filename: "abcde" },
      { filename: "def" },
      { filename: "xyz" }
    ];
    const sortedArray = customSort(inputArray);
    expect(sortedArray).to.deep.equal(expectedArray);
  });

  it('should handle numbers at the end correctly', () => {
    const inputArray = [
      { filename: "def21" },
      { filename: "def10" },
      { filename: "def" },
      { filename: "abc10" }
    ];
    const expectedArray = [
      { filename: "abc10", },
      { filename: "def", },
      { filename: "def10", },
      { filename: "def21" }
    ];
    const sortedArray = customSort(inputArray);
    expect(sortedArray).to.deep.equal(expectedArray);
  });
});

