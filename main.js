const nameEl = document.querySelector("input[name='Name']");
const jobEl = document.querySelector("input[name='job']");
const expEl = document.querySelector("input[name='exp']");
const tbodyEl = document.querySelector(".tbody");

const lsDataArr = JSON.parse(localStorage.getItem("dataArr"));

let dataArr;
if (lsDataArr) {
  dataArr = lsDataArr;
} else {
  dataArr = [];
}
let splicedItem;
let indexV;
function handleFormSubmit() {
  const formData = fetchDataFromForm();
  if (splicedItem == undefined) {
    sendDataToLS(formData);
    showDataToTable();
  } else {
    updateData();
  }
  resetForm();
}

console.log(dataArr);
function fetchDataFromForm() {
  const formData = {};
  formData["name"] = nameEl.value;
  formData["job"] = jobEl.value;
  formData["exp"] = expEl.value;
  return formData;
}

function sendDataToLS(formData) {
  dataArr.push(formData);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
}

function showDataToTable() {
  tbodyEl.innerHTML = dataArr
    .map((item, index) => {
      return `
            <tr>
               <td> ${index + 1}</td>
               <td>${item.name}</td>
               <td>${item.job}</td>
               <td>${item.exp}</td>
               <td class="action--btns">
                    <i  onclick=deleteItem(${index}) class="fas fa-trash"></i>
                    <i onclick=editItem(${index})  class="fas fa-edit"></i>
               </td>
            </tr>
        `;
    })
    .join("");
}
showDataToTable();

function deleteItem(index) {
  dataArr.splice(index, 1);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  showDataToTable();
}

function editItem(index) {
  indexV = index;
  splicedItem = dataArr.splice(index, 1);
  nameEl.value = splicedItem[0].name;
  jobEl.value = splicedItem[0].job;
  expEl.value = splicedItem[0].exp;
}

function updateData() {
  splicedItem[0].name = nameEl.value;
  splicedItem[0].job = jobEl.value;
  splicedItem[0].exp = expEl.value;
  dataArr.splice(indexV, 0, splicedItem[0]);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  showDataToTable();
}

function resetForm() {
  nameEl.value = "";
  jobEl.value = "";
  expEl.value = "";
  splicedItem = null;
  indexV = null;
}

let indexV2 = 2;
const arr = ["a", "b", "c", "d"];
// const splicedValue = arr.splice(indexV2, 1);
// console.log(splicedValue);
// console.log(arr);
// arr.splice(indexV2, 0, "c");
// console.log(arr);
// console.log(typeof arr);
// const stringV = JSON.stringify(arr);
// console.log(stringV);
// const arrV = JSON.parse(stringV);
// console.log(arrV);
