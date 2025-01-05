let taskList = [];
const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const objData = new FormData(e);

  const task = objData.get("task");
  const hours = parseInt(objData.get("hours"));

  const obj = {
    task,
    hours,
    Id: randomIdGenerator(),
    type: "entry",
  };

  const existinghrs = totalHours();
  // console.log(existinghrs + obj.hours);
  if (existinghrs + obj.hours > hoursPerWeek) {
    return alert(`You cannot add more than ${hoursPerWeek} `);
  }
  // if (obj.hours > hoursPerWeek) {
  //   return alert(`You cannot add more than ${hoursPerWeek} `);
  // }

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const tblEntryList = document.getElementById("tbl-entry-list");
  const entryList = taskList.filter((item) => {
    return item.type === "entry";
  });

  // console.log("entry list", entryList);
  entryList.filter((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hours}</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="handlOnDelete('${
                      item.Id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-warning" onclick="switchTask('${
                      item.Id
                    }','bad')">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  tblEntryList.innerHTML = str;
  totalHours();
};

const handlOnDelete = (id) => {
  if (window.confirm("Are you sure want to delete ?")) {
    taskList = taskList.filter((item) => item.Id != id);
    displayEntryList();
    displayBadList();
  }
};

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.Id === id) {
      item.type = type;
    }
    return item;
  });
  // console.log("switchTask clicked", taskList);
  displayEntryList();
  displayBadList();
};

const displayBadList = () => {
  const badList = taskList.filter((item) => {
    return item.type === "bad";
  });

  // console.log(badList);
  let str = "";
  badList.map((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hours}</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="handlOnDelete('${
                      item.Id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success" onclick="switchTask('${
                      item.Id
                    }','entry')">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                  </td>
                </tr>`;
  });
  const tblBadList = document.getElementById("tbl-bad-list");
  tblBadList.innerHTML = str;
  const ttlbadhours = document.getElementById("ttlbadhours");
  ttlbadhours.innerText = badList.reduce((acc, item) => {
    return acc + item.hours;
  }, 0);
  totalHours();
};

const totalHours = () => {
  const ttlhrs = taskList.reduce((acc, item) => {
    return acc + parseInt(item.hours);
  }, 0);

  const ttlhrsElm = document.getElementById("ttlhrs");
  ttlhrsElm.innerText = ttlhrs;
  return ttlhrs;
};

const randomIdGenerator = (lenght = 6) => {
  const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }

  return id;
};
