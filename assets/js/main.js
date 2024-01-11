// *** main --> Create Page Scroll Progress                          

{
  // ! ------------------------------------------- Variables
  
  let scrollProgress = document.querySelector(".scroll-progress");
  
  // ! ------------------------------------------- Events
  
  window.addEventListener("scroll", scrollProgressFunc);
  
  // ! ------------------------------------------- Functions
  
  let pageHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;
  let scollingHeight = pageHeight - clientHeight;
  function scrollProgressFunc() {
    let scrollingDistance = document.documentElement.scrollTop;
    let widthPercentage = (scrollingDistance / scollingHeight) * 100;
    scrollProgress.style.width = `${widthPercentage}%`;
  }
}

// *** main --> Increase Numbers On Scrolling                        

{
  // ! ------------------------------------------- Variables

  let sectionThree = document.querySelector(".section3");
  let nums = document.querySelectorAll(".num");
  let start = false;

  // ! ------------------------------------------- Events
  
  window.addEventListener("scroll", increaseNumbers);
  
  // ! ------------------------------------------- Functions

  function increaseNumbers() {
    if (window.scrollY >= sectionThree.offsetTop - 250) {
      if (!start) {
        nums.forEach(function (num) {
          let goal = num.dataset.goal;
          let counter = setInterval(function () {
            num.textContent++;
            if (num.textContent === goal) {
              clearInterval(counter);
            }
          }, 3000 / goal);
        });
      }
      start = true;
    }
  }
}

// *** main --> Animate With On Scrolling                            

{
  // ! ------------------------------------------- Variables
  
  let sectionTwo = document.querySelector(".section2");
  let progress = document.querySelectorAll(".progress span");
  let start = false;
  
  // ! ------------------------------------------- Events
  
  window.addEventListener("scroll", progressBar);

  // ! ------------------------------------------- Functions

  function progressBar() {
    let sectionTwoTop = sectionTwo.offsetTop - 250;
    if (window.scrollY >= sectionTwoTop) {
      if (!start) {
        progress.forEach(function (ele) {
          let dataWidth = ele.dataset.width;
          ele.style.width = dataWidth;
        });
      }
      start = true;
    }
  }
}

// *** main --> Create Count Down Timer                              

{
  // ! ------------------------------------------- Variables

  let days = document.querySelector(".days");
  let hours = document.querySelector(".hours");
  let minutes = document.querySelector(".minutes");
  let seconds = document.querySelector(".seconds");
  let countDownDate = new Date("31 Jan, 2024 23:59:59").getTime();

  // ! ------------------------------------------- Events

  let counter = setInterval(countDownFunc, 1000);

  // ! ------------------------------------------- Functions

  function countDownFunc() {
    let dateNow = new Date().getTime();

    let targetDate = countDownDate - dateNow;

    let daysTime = Math.floor(targetDate / (1000 * 60 * 60 * 24));
    let hoursTime = Math.floor((targetDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesTime = Math.floor((targetDate % (1000 * 60 * 60)) / (1000 * 60));
    let secondsTime = Math.floor((targetDate % (1000 * 60)) / 1000);

    days.textContent = `${daysTime < 10 ? "0" + daysTime : daysTime} : `;
    hours.textContent = `${hoursTime < 10 ? "0" + hoursTime : hoursTime} : `;
    minutes.textContent = `${minutesTime < 10 ? "0" + minutesTime : minutesTime} :`;
    seconds.textContent = `${secondsTime < 10 ? "0" + secondsTime : secondsTime}`;

    if (targetDate === 0) {
      clearInterval(counter);
    }
  }
}

// *** main --> Count Input Characters And Fill Borders              

{
  // ! ------------------------------------------- Variables

  let input = document.querySelector(".count-characters input");
  let inputProgress = document.querySelector(".count-characters .input-progress");
  let counter = document.querySelector(".count-characters .number-characters");
  let maxLength = input.getAttribute("maxlength");

  // ! ------------------------------------------- Events

  counter.textContent = maxLength;
  input.addEventListener("input", inputCharFunc);

  // ! ------------------------------------------- Functions

  function inputCharFunc() {
    let value = input.value.length;
    counter.textContent = maxLength - value;
    if (maxLength - value === 0) {
      counter.style.color = "red";
    } else {
      counter.style.color = "black";
    }
    let widthPercentage = (value / maxLength) * 100;
    inputProgress.style.width = `${widthPercentage}%`;
  }
}

// *** main --> Full Screen Navigation                               

{
  // ! ------------------------------------------- Variables
  
  let nav = document.querySelector(".nav");
  let menuBars = document.querySelector(".menu-bars");
  let closeBtn = document.querySelector(".close");
  
  // ! ------------------------------------------- Events

  menuBars.addEventListener("click", openNavMenu);
  closeBtn.addEventListener("click", closeNavMenu);
  document.addEventListener("keydown", closeEscMenu);

  // ! ------------------------------------------- Functions

  function openNavMenu() {
    nav.style.transform = "translateY(0)";
  }

  function closeNavMenu() {
    nav.style.transform = "translateY(-100%)";
  }

  function closeEscMenu(e) {
    if (e.key === "Escape") closeNavMenu();
  }
}

// *** main --> Random Background Color                              

{
  // ! ------------------------------------------- Variables

  let sections = document.querySelectorAll("section");

  // ! ------------------------------------------- Events

  window.addEventListener("load", randomColor);

  // ! ------------------------------------------- Functions

  function randomColor() {
    sections.forEach(function (section) {
      let arrColor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
      let myColor = "#";
      for (let i = 0; i < 6; ++i) {
        let randomIndex = Math.floor(Math.random() * arrColor.length);
        myColor += `${arrColor[randomIndex]}`;
      }
      isTooDark(myColor, section);
      section.style.backgroundColor = myColor;
    })
  }

  function isTooDark(hexcolor, section){
    let r = parseInt(hexcolor.substr(1, 2), 16);
    let g = parseInt(hexcolor.substr(3, 2), 16);
    let b = parseInt(hexcolor.substr(5, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    if (yiq <= 150) section.style.color = "white";
  }
}

// *** main --> Create Our Works Filter                              

{
  // ! ------------------------------------------- Variables

  let tabs = document.querySelectorAll(".works-filter .list li");
  let wrapper = document.querySelector(".works-filter .imgs");
  let imgs = document.querySelectorAll(".works-filter .imgs img");

  // ! ------------------------------------------- Events

  tabs.forEach(function (tab) {
    tab.addEventListener("click", rmAdActive);
  });

  // ! ------------------------------------------- Functions

  function rmAdActive() {
    tabs.forEach(function (tab) {
      tab.classList.remove("active");
    });
    this.classList.add("active");
    fliter(this.textContent);
  }

  function fliter(type) {
    wrapper.innerHTML = ""
    if (type === "All Work") {
      imgs.forEach(function(img) {
        wrapper.innerHTML += `<img src=${img.src} alt="IMAGE"/>`;
      });
    } else {
      imgs.forEach(function(img) {
        let text = img.src.split("=")[1];
        if (type === text) {
          wrapper.innerHTML += `<img src=${img.src} alt="IMAGE"/>`;
        }
      });
    }
  }
}

// *** main --> Generate Random Serial Number                        

{
  // ! ------------------------------------------- Variables

  let serialNumber = document.querySelector(".serial");
  let generate = document.querySelector(".generate");
  let data = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

  // ! ------------------------------------------- Events

  window.addEventListener("load", generateSerial);
  generate.addEventListener("click", generateSerial);

  // ! ------------------------------------------- Functions

  function generateSerial() {
    let serial = "";
    for (let i = 0; i < 10; ++i) {
      let index = Math.floor(Math.random() * data.length);
      serial += data[index];
    }
    serialNumber.textContent = serial;
  }
}

// *** main --> Create Tabs                                          

{
  // ! ------------------------------------------- Variables

  let tabs = document.querySelectorAll(".section7 .tab");
  let contents = document.querySelectorAll(".section7 .content");

  // ! ------------------------------------------- Events

  tabs.forEach(function (tab) {
    tab.addEventListener("click", removeAndAddActive);
  });

  // ! ------------------------------------------- Functions

  function removeAndAddActive() {
    tabs.forEach(function (tab) {
      tab.classList.remove("active");
    });
    contents.forEach(function (content) {
      content.classList.remove("active");
    });
    this.classList.add("active");
    contents[this.dataset.index].classList.add("active");
  }
}

// *** main --> Scroll To Top                                        

{
  // ! ------------------------------------------- Variables

  let scrollTop = document.querySelector(".scroll-top");

  // ! ------------------------------------------- Events

  window.addEventListener("scroll", appearBtn);
  scrollTop.addEventListener("click", goToTop);

  // ! ------------------------------------------- Functions

  function appearBtn() {
    if (window.scrollY >= 1000) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// *** main --> Scroll To Bottom                                     

{
  // ! ------------------------------------------- Variables

  let scrollBottom = document.querySelector(".scroll-bottom");

  // ! ------------------------------------------- Events

  scrollBottom.addEventListener("click", scrollToBottom);

  // ! ------------------------------------------- Functions

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }
}

// *** main --> Control Local Storage                                

{
  // ! ------------------------------------------- Variables

  let inputValue = document.querySelector(".control-local input");
  let checkItem = document.querySelector(".chk-item");
  let addItem = document.querySelector(".add-item");
  let deleteItem = document.querySelector(".del-item");
  let showItem = document.querySelector(".shw-item");
  let result = document.querySelector(".result");
  let value;

  let items = [];

  if (localStorage.item) items = JSON.parse(localStorage.getItem("item"));

  // ! ------------------------------------------- Events

  checkItem.addEventListener("click", checkItemFunc);
  addItem.addEventListener("click", addItemFunc);
  deleteItem.addEventListener("click", deleteItemFunc);
  showItem.addEventListener("click", showItemFunc);

  // ! ------------------------------------------- Functions

  // ---------- Check Item Function 
  function checkItemFunc() {
    function callBackFunc() {
      let flag = true;
      value = inputValue.value.trim();
      result.innerHTML = "";
      for (let i = 0; i < items.length; ++i) {
        if (value === items[i]) {
          result.innerHTML += `<span>${items[i]}</span>`
          flag = false;
        } 
      }
      if (flag) {
        result.innerHTML = `<span>${inputValue.value}</span> Is Not Exist`;
      }
      emptyInput();
    }
    emptyField(callBackFunc);
  }

  // ---------- Add Item Function 
  function addItemFunc() {
    function callBackFunc() {
      value = inputValue.value;
      if (value) {
        items.push(value);
        result.innerHTML = "";
        result.innerHTML += `<span>${inputValue.value}</span> Has Been Added To Local Storage`;
        addToLocalStorage();
        emptyInput();
      } else {
        result.textContent = "The Filed Is Empty !!";
      }
    }
    emptyField(callBackFunc);
  }

  // ---------- Delete Item Function 
  function deleteItemFunc() {
    function callBackFunc() {
      let flag = true;
      value = inputValue.value;
      for (let i = 0; i < items.length; ++i) {
        if (value === items[i]) {
          items.splice(i, 1);
          addToLocalStorage();
          flag = false;
          result.innerHTML = `<span>${inputValue.value}</span> Has Been Deleted From Local Storage`;
        }
      }
      if (flag) {
        result.textContent = "This Element Is Not Exist To Delete It";
      }
      emptyInput();
    }
    emptyField(callBackFunc);
  }

  // ---------- Show Item Function 
  function showItemFunc() {
    value = inputValue.value;
    result.innerHTML = "";
    for (let i = 0; i < items.length; ++i) {
      result.innerHTML += `<span>${items[i]}</span>`;
    }
    if (!items.length) {
      result.textContent = "Local Storage Is Empty";
    }
  }

  // ---------- Empty Input Tag Function 
  function emptyInput() {
    inputValue.value = "";
  }

  // ---------- Add To Local Storage Function 
  function addToLocalStorage() {
    localStorage.setItem("item", JSON.stringify(items));
  }

  // ---------- Check Empty Field Function
  function emptyField(callBackFunc) {
    if (inputValue.value) {
      callBackFunc();
    } else {
      result.textContent = "The Filed Is Empty !!";
    }
  }
}