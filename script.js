let taskList = [];

const handleOnSubmit = (e) => {
  const data = new FormData(e);
  const task = data.get("Task");
  const hours = data.get("Hours");
  const obj = {
    task,
    hours,
    Id: randomIdGenerator(),
  };
  //   taskList.push(obj);
  addItem(obj);
  displayEntryList();

  //   console.log(taskList);
};
function addItem(newItem) {
  // Check if the item already exists in the array
  const isDuplicate = taskList.some((item) => item.task === newItem.task);

  if (isDuplicate) {
    alert("Duplicate item! Not adding to the List.");
  } else {
    taskList.push(newItem);
    // console.log("Item added successfully.");
  }
}
const displayEntryList = () => {
  //   console.log(taskList);

  let str = "";
  const entryList = document.getElementById("entryList");
  taskList.map((items, i) => {
    str += ` <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${items.task}</td>
                    <td>${items.hours}</td>
                    <td class="text-end">
                      <button onclick="deleteItems('${
                        items.Id
                      }')" class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button onclick="moveToBadList('${
                        items.Id
                      }')" class="btn btn-success">
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>`;
    entryList.innerHTML = str;
  });
};

const displayBadList = () => {
  //   console.log(taskList);

  let str = "";
  const entryList = document.getElementById("badList");
  taskList.map((items, i) => {
    str += ` <tr>
                    <th scope="row">${i}</th>
                    <td>${items.task}</td>
                    <td>${items.hours}</td>
                    <td class="text-end">
                      <button class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button class="btn btn-warning">
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>
                    </td>
                  </tr>`;
    entryList.innerHTML = str;
  });
};

const randomIdGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let id = "";
  for (i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

const deleteItems = (id) => {
  if (window.confirm("Are you want to delete it")) {
    taskList = taskList.filter((item) => {
      return item.Id !== id;
    });
    //   taskList = taskList.filter((item) => item.Id !== id);

    displayEntryList();
  }
};

const moveToBadList = (id) => {
  taskList = taskList.filter((item) => {
    return item.Id !== id;
  });
  //   deleteItems(id);
  displayEntryList();
  displayBadList();
};
