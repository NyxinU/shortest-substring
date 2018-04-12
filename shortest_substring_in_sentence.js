// I assume that list of words given are all unique and that the solution is case insensitive

var minWindow = function (s, w) {
  const wordsInS = {};
  const indices = [];
  let minAndMax = [];
  let res = [];
  const sentence = s.toLowerCase().split(" ");
  const words = w.map(word => word.toLowerCase());

  // I create a hash to keep track of what each indice in the indices array represents
  // { cat: 0, dog: 1, chased: 2 }
  // In this case the element at indices[0] will be the index of "cat" in string s
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    wordsInS[word] = i;
  }

  for (let i = 0; i < sentence.length; i++) {
    let word = sentence[i];
    if (wordsInS[word] || wordsInS[word] === 0) { // If this is a word I am looking for
      let prevIndex = indices[wordsInS[word]];
      if (prevIndex || prevIndex === 0) { // If I have seen this word before
        let indexOfPrev = minAndMax.indexOf(prevIndex);
        minAndMax = minAndMax.slice(0, indexOfPrev).concat(minAndMax.slice(indexOfPrev + 1, minAndMax.length)); // delete the index where I last saw this word
      }
      indices[wordsInS[word]] = i;  // Update the index of this word in the indices array
      minAndMax.push(i);
      if (minAndMax.length === words.length) { // If I have seen all the words I am looking for at least once
        if (res.length === 0 || minAndMax[minAndMax.length - 1] - minAndMax[0] < res.length) { // If my current substring is shorter than res 
          res = sentence.slice(minAndMax[0], minAndMax[minAndMax.length - 1] + 1);
        }
      }
    }
  }
  return res.join(" ");
};

const s = "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat";
const w = ['cat', 'dog', 'chased'];
console.log(minWindow(s, w));

// I took a sliding window approach to solving this problem
// Instead of calling .min() and .max() to figure out the size of my window, 
// which would be another O(n) operation inside my for loop. I implemented a queue with the first and last index representing the size of the window.
// Overall the time complexity of this problem would be O(n*m) n being the number of words in the sentence and m being the number of elements I have in my minAndMax array (when I call indexOf on line 24)

