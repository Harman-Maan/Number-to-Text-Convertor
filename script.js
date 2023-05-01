const places = {
  once: [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Ninteen",
  ],
  tence: ["Zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
  ins: ["Hunderd", "Thousand", "Lakh", "Crore", "Arawb", "kharawb"],
  inu: ["Hunderd", "Thousand", "Million", "Billion", "Trillion"],
};
let output = document.getElementById("output");

function convert() {
  let numberSystem = document.querySelector('input[name="numbering-system"]:checked').id;
  num = new String(document.getElementById("number").value);

  if (num == 0) {
    output.textContent = "";
    return;
  }
  let result = [];

  if (numberSystem == "international") {
    for (let i = 0; i < num.length; i += 3) {
      let regexstring = `\\d{1,3}(?=(\\d{${i}}$))`;
      let regex = new RegExp(regexstring);
      let numPart = num.match(regex)[0];
      let numLast = numPart.match(/\d{1,2}$/)[0];
      if (numPart !== "000") {
        result.unshift(i + 1 > 3 ? " " + places.inu[Math.floor((i + 1) / 3)] + " " : "");
        result.unshift(numLast < 19 ? places.once[parseInt(numLast)] : places.tence[numPart[numPart.length - 2]] + " " + places.once[numPart[numPart.length - 1]]);
        result.unshift(numPart[2] ? places.once[parseInt(numPart[0])] + " Hundred " : "");
      }
    }
  } else {
    let increase = 0;

    let times = 1;
    for (let i = 0; i <= num.length; i += 2) {
      if (num.length == 2) {
        solve(num.match(/\d{1,2}$/), false, false);
        break;
      }
      switch (times) {
        case 1:
          solve(num.match(/\d{1,2}$/), false, false);
          break;
        case 2:
          solve(num.match(/\d(?=(\d{2}$))/), true, false);
          break;
        default:
          let regexstring = `\\d{1,2}(?=(\\d{${times}}$))`;
          let regex = new RegExp(`${regexstring}`);
          solve(num.match(regex), false, true);
          times++;
      }
      times++;
    }

    function solve(number, isHundered, isThousandOrMore) {
      console.log(number[0]);
      if (isThousandOrMore) increase++;
      if (number[0] === "00" || number[0] === "0") return;
      if (number[0] < 20) result.unshift(places.once[parseInt(number[0])] + (isHundered ? " Hundred " : isThousandOrMore ? " " + places.ins[increase] + " " : ""));
      else result.unshift(places.tence[number[0][0]] + " " + places.once[number[0][1]] + (isThousandOrMore ? " " + places.ins[increase] + " " : ""));
    }
  }

  result = result.filter((value) => value);

  output.textContent = result.join("");
}
