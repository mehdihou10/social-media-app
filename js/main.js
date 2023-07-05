/*---------------------start header----------------------*/

//select Elements
let inputSearch = document.querySelector("header .container .search input");
let searchIcon = document.querySelector("header .container .search i:first-child");
let deleteValue = document.querySelector("header .container .search i:last-child");
let searchUl = document.querySelector("header .container .search ul");
let contact = document.querySelectorAll(".contact");

//go to contact page
contact.forEach(el => el.onclick = ()=> window.location.href = "contact.html");

//focus on input when you click on search icon
searchIcon.onclick = function(){
    inputSearch.focus();
}

//show / remove delete icon
inputSearch.oninput = function(){

    if(this.value !== ""){
        deleteValue.classList.add("show");
    }
    else{
        deleteValue.classList.remove("show");
    }
};

//delete input value + search list when you click on x-mark
deleteValue.onclick = ()=>{

    inputSearch.value = "";
    inputSearch.focus();
    deleteValue.classList.remove("show");
    searchUl.classList.remove("show");
};

//search list

//get data from json file function
async function getData(){

    let result = await fetch("search.json");
    return await result.json();
}


//get data and show it in page
inputSearch.addEventListener("input",async(e)=>{

    let data = await getData();

    //show search list
    if(e.target.value.trim() !== ""){
        searchUl.classList.add("show");
    }
    else{
        searchUl.classList.remove("show");
    }
    
    //filter data (depends on input value)
    let arr = data.filter(dt => dt.title.includes(e.target.value.toLowerCase()));

    searchUl.innerHTML = "";

    //show data in the page if it exists
    if(arr.length === 0){
        let noFoundParagraph = document.createElement("p");
        noFoundParagraph.innerHTML = "Not Found";
        searchUl.append(noFoundParagraph);
    }
    else{

        for(let i = 0; i < arr.length; i++){

            let li = document.createElement("li");
            li.innerHTML = arr[i].title;
            searchUl.append(li);
    
            //go to the selected search input value section or link
            li.addEventListener("click",(e)=>{
    
                inputSearch.value = e.target.innerHTML;
                searchUl.classList.remove("show");
    
                if(arr[i].type === "link"){
                    window.location.href = arr[i].url;
                }
    
                else{
    
                    if(arr[i].section === "last"){
                        window.scrollTo(100000,1000000);
                    }
                    else{
                        document.querySelector(arr[i].section).scrollIntoView();
                    }
                }
    
            });
        }
    }

   
});

/*---------------------end header----------------------*/

/*---------------------start section----------------------*/

/*---------------------start left----------------------*/

//select elements
let leftPart = document.querySelector("section .left");
let rightPart = document.querySelector("section .right");
let sideElements = document.querySelectorAll("section .left ul li");
let notificationPopup = document.querySelector("section .left ul .notifications-part");
let gear = document.querySelector("section .left aside > i");
let messageBox = document.querySelector(".right .messages-part");
let theme = document.querySelector(".theme");

//change active class when you click on li
sideElements.forEach(li=>{

    li.addEventListener("click",(e)=>{

        //remove active class
        sideElements.forEach(del => del.classList.remove("active"));

        //add active class on clickable li
        e.currentTarget.classList.add("active");

        //home section
        if(e.currentTarget.classList.contains("home")){
            window.scrollTo(0,0);
        }

       //remove number of messages/notifications
       if(e.currentTarget.classList.contains("special")){
        
        if(e.currentTarget.children[1].tagName === "SPAN" && e.currentTarget.children[1].classList.length === 0){
            e.currentTarget.children[1].remove();
        }
       }

       //attache message when you click on message
       if(e.currentTarget.classList.contains("message")){

        window.scrollTo(0,0);

        if(window.innerWidth > 991){
            messageBox.classList.add("attache");
    
            setTimeout(()=>{
    
                messageBox.classList.remove("attache");
            },3000);
        } else{
            rightPart.classList.toggle("show");
        }
      
       }

       //go to saved postes
       if(e.currentTarget.classList.contains("saved")){
        location.href = "saved_posts.html";
       }

       //show theme
       if(e.currentTarget.classList.contains("theme-li")){
        theme.style.display = "block";

        document.querySelector(".body-overlay").classList.add("show");
       }


    });
});

 //show/remove notification

 document.addEventListener("click",(e)=>{

    if(e.target.hasAttribute("data-notification")){
        notificationPopup.classList.toggle("show");
    }
 });


//show side bar
gear.onclick = function(){

    leftPart.classList.toggle("show");
};

/*--------------------- end left----------------------*/

/*--------------------- start main----------------------*/

//select elements
let contentOfMain = document.querySelector("section main .content");
let postBtn = document.querySelector("section main .post-profile > span");
let inputFile = document.querySelector(" section main .post-profile > input");
let inputText = document.querySelector("section main .post input");
let stories = document.querySelectorAll("section main .stories img:not(.profile)");

//create poste

//array to save boxes data
let arrLocalStorage = [];

//create first in localStorage

let boxesLocalStorage = window.localStorage.getItem("boxes");

if(boxesLocalStorage){

    let data = JSON.parse(boxesLocalStorage);

    for(let i = 0; i < data.length; i++){

        //create box
        let box = document.createElement("div");
        box.className = "box";
        box.id = data[i].id;
        box.innerHTML = data[i].content;
        contentOfMain.prepend(box);

        
        //save new + old boxes
        let obj = {
            id: box.id,
            content: box.innerHTML
        }

        arrLocalStorage.push(obj);
    }
}


postBtn.onclick = ()=>{

    if(inputFile.value !== ""){

    //create box
    let box = document.createElement("div");
    box.className = "box";


    //create profile user
    let user = document.createElement("div");
    user.className = "user";

    //create post image
    let userPhoto = document.createElement("img");
    userPhoto.alt = "user";
    userPhoto.className = "img-border";
    userPhoto.src = "images/profile-1.jpg";

    user.appendChild(userPhoto);

    //complete user elements
    user.innerHTML += `<div class="user-infos">
    <div class="user-name">Dianna Ayl</div>
    <div class="time-ago">1 minutes ago</div>
</div>`;

box.appendChild(user);

//create image post
let postImage = document.createElement("img");
postImage.alt = "feed";
postImage.className = "feed";

if(inputFile.files[0]){
    postImage.src = URL.createObjectURL(inputFile.files[0]);
}

box.appendChild(postImage);

    //create post text
    let postText = document.createElement("p");
    postText.className = "post-text";
    postText.innerHTML = inputText.value;
    box.appendChild(postText);

//finish the rest

box.innerHTML += `<div class="reactions">
<i class="fa-regular fa-heart"></i>
<i class="fa-regular fa-comment-dots"></i>
<i class="fa-solid fa-share-nodes flex-g"></i>
<i class="fa-regular fa-bookmark c-pointer"></i>
</div>

<div class="liked">
<div class="profiles">

    <img src="images/profile-8.jpg" alt="profile" class="img-border">
    <img src="images/profile-11.jpg" alt="profile" class="img-border">
    <img src="images/profile-20.jpg" alt="profile" class="img-border">

</div>

<p>Liked by <span>Emest Achiever</span> and <span>2 others</span></p>

</div>

<div class="comment"><span>Dati Rose</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

<div class="info">View all 3 comments</div>`;

    //create box delete
    let deleteBox = document.createElement("i");
    deleteBox.className = "fa-solid fa-xmark delete";
    box.prepend(deleteBox);


//put the box in the start of the content
contentOfMain.prepend(box);
    
//set in the local storage added boxes

const obj = {

    id: Date.now(),

    content: box.innerHTML
}

box.id = obj.id;

arrLocalStorage.push(obj);

window.localStorage.setItem("boxes",JSON.stringify(arrLocalStorage));

//save box by clicking on bookmark
saveBoxes();
}

else{
    alert("Choose Image");
}

};

//array of saved boxes
let arrSavedBoxes = [];

//delete added boxes by clicking on x-mark from : page + localStorage
document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete") & e.target.parentElement.className === "box"){


        for(let i = 0; i < arrLocalStorage.length; i++){

            if(arrLocalStorage[i].id == e.target.parentElement.id){
                arrLocalStorage.splice(i,1);
                window.localStorage.setItem("boxes",JSON.stringify(arrLocalStorage));
                e.target.parentElement.remove();

            }
        }

        //delete saved added boxes
       deleteContent(arrSavedBoxes,e.target.parentElement,"saved-boxes")
    }
});


//saved boxes in localStorage
let savedBoxesLocalStorage = window.localStorage.getItem("saved-boxes");

if(savedBoxesLocalStorage){

    let boxes = document.querySelectorAll("section main .content .box");
    let savedbookmarkrs = document.querySelectorAll("section main .content .box .fa-bookmark");

    let data = JSON.parse(savedBoxesLocalStorage);

   

        for(let i = 0; i < data.length; i++){

            boxes.forEach((box,index) =>{

            if(box.id === data[i].id){
                savedbookmarkrs[index].className = "fa-solid fa-bookmark c-pointer";

            }
            });

            let obj = {
                id: data[i].id,
                content: data[i].content
            }

            arrSavedBoxes.push(obj);
        }

    
}


//bookmarkrs function

function saveBoxes(){

//select all bookmarkrs
let bookmarkrs = document.querySelectorAll("main .content .box .fa-bookmark");
    
    bookmarkrs.forEach(mark =>{
        
//when you click on bookmark
mark.onclick = function(){
        
    //save the box in local storage and add full bookmark icon
    let box = this.parentElement.parentElement;

    if(this.classList.contains("fa-regular")){
        
    this.className = "fa-solid fa-bookmark c-pointer";

    let obj = {
        id: box.id,
        content: box.innerHTML
    }

    arrSavedBoxes.push(obj);

    window.localStorage.setItem("saved-boxes",JSON.stringify(arrSavedBoxes));

    }
    else{

        //delete box from saved boxes
    this.className = "fa-regular fa-bookmark c-pointer";

    
    deleteContent(arrSavedBoxes,box,"saved-boxes");

        
    }


    
                
};

});
}
saveBoxes();


//delete box from saved box
function deleteContent(arr,del,item){
    for(let i = 0; i < arr.length; i++){

        if(arr[i].id == del.id){
            arr.splice(i,1);
            window.localStorage.setItem(item,JSON.stringify(arr));
        }
    }
}

//show story popup
stories.forEach(story =>{

    story.addEventListener("click",(e)=>{

        //create popup
        let popup = document.createElement("div");
        popup.className = "story-popup";

        //create image
        let img = document.createElement("img");
        img.src = e.currentTarget.src;
        img.alt = "story";
        popup.append(img);

        //create delete popup icon(x-mark)
        let deletePopup = document.createElement("i");
        deletePopup.className = "fa-solid fa-xmark delete-popup";
        popup.append(deletePopup);

        //append popup to body
        document.body.prepend(popup);

        //add body overlay to page
        document.querySelector(".body-overlay").classList.add("show");


    });
});

//delete popup
document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete-popup")){
        e.target.parentElement.remove();
        document.querySelector(".body-overlay").classList.remove("show");
    }
});


/*--------------------- end main----------------------*/

/*--------------------- start right part----------------------*/

//select elements
let requests = document.querySelectorAll(".right .requests .content .request");
let buttonsRequest = document.querySelectorAll(".right .requests .content .request .buttons span");
let inputMessage = document.querySelector(".right .messages-part .search input");
let messagesContent = document.querySelector(".right .messages-part .content");
let messages = document.querySelectorAll(".right .messages-part .message .second span:first-child");

//accept / decline new friend by click and save in local storage

//array of requests
let arrRequest = [];

//save changes in local storage
let requestLocalStorage = window.localStorage.getItem("requests");

if(requestLocalStorage){

    let data = JSON.parse(requestLocalStorage);

    requests.forEach(request =>{

        for(let i = 0; i < data.length; i++){


            //verfify if the request in answered
            if(request.innerHTML === data[i]){

                arrRequest.push(request.innerHTML);

                //remove request
                request.remove();
                
            }
        }
    });

}

buttonsRequest.forEach((btn) =>{

    btn.addEventListener("click",(e)=>{

        let parent = e.currentTarget.parentElement.parentElement;

        arrRequest.push(parent.innerHTML);

        //save changes in local storage
        window.localStorage.setItem("requests",JSON.stringify(arrRequest));

        //remove request + inform user with the new update
        parent.remove();

        if(e.currentTarget.innerHTML.toLowerCase() === "accept"){
            alert("You Have Added New Friend");
        }
        else{
            alert("You Have Declined New Friend");
        }
    });
});

//filter messages
inputMessage.oninput = function(){

    let inputValue = this.value.toLowerCase();
    
    let newArr = Array.from(messages).filter(msg =>{

        let check = true;

        let msgValue = msg.innerHTML.toLowerCase();


                if(msgValue.includes(inputValue) === false){
                    check = false;
                }
                
            


        if(check === true){
            return msg;
        }


    });

    messagesContent.innerHTML = "";

    newArr.forEach(span => messagesContent.appendChild(span.parentElement.parentElement));
};

/*--------------------- end right part----------------------*/





/*--------------------- end section----------------------*/

/*--------------------- start theme ----------------------*/

//select elements
let deleteTheme = theme.children[0];
let fontSizeBullets = document.querySelectorAll(".theme .font-size .content span");
let colorsBullets = document.querySelectorAll(".theme .colors .content span");
let backgrounds = document.querySelectorAll(".theme .backgrounds .content .bg");

//delete theme
deleteTheme.onclick = function(){

    this.parentElement.style.display = "none";
    document.querySelector(".body-overlay").classList.remove("show");
};

//mange theme

//set the value on local storage on page
setChanges(window.localStorage.getItem("font-size"),"--font-size",fontSizeBullets,"font");
setChanges(window.localStorage.getItem("main-color"),"--main-color",colorsBullets,"color");
setChanges(window.localStorage.getItem("main-background"),"--bg-color",backgrounds,"bg");
setChanges(window.localStorage.getItem("color-text"),"--color-text",backgrounds,"text");
setChanges(window.localStorage.getItem("body-color"),"--body-color",backgrounds,"body");



//manage font size
fontSizeBullets.forEach(bullet =>{

    bullet.addEventListener("click",(e)=>{

        //change active class
        changeActive(fontSizeBullets,e.currentTarget);

        document.documentElement.style.setProperty("--font-size",e.currentTarget.dataset.font);

        //save in local storage
        window.localStorage.setItem("font-size",e.currentTarget.dataset.font);

    });
});


//manage colors
colorsBullets.forEach(bullet =>{

    bullet.addEventListener("click",(e)=>{

        //change active class
        changeActive(colorsBullets,e.currentTarget);

        document.documentElement.style.setProperty("--main-color",e.currentTarget.dataset.color);

        //save in local storage
        window.localStorage.setItem("main-color",e.currentTarget.dataset.color);
    })
});


//manage backgrounds
backgrounds.forEach(bg =>{

    bg.addEventListener("click",(e)=>{

    //add active class
    changeActive(backgrounds,e.currentTarget);

    document.documentElement.style.setProperty("--bg-color",e.currentTarget.dataset.bg);
    document.documentElement.style.setProperty("--color-text",e.currentTarget.dataset.text);
    document.documentElement.style.setProperty("--body-color",e.currentTarget.dataset.body);

    //save in the local storage
    window.localStorage.setItem("main-background",e.currentTarget.dataset.bg);
    window.localStorage.setItem("color-text",e.currentTarget.dataset.text);
    window.localStorage.setItem("body-color",e.currentTarget.dataset.body);


    });
});

//change active class function
function changeActive(elements,element){

elements.forEach(del => del.classList.remove("active"));
element.classList.add("active");

}

//function : set the saved changes on page
function setChanges(item,changeVar,parent,data){
    if(item){
        document.documentElement.style.setProperty(changeVar,item);

        parent.forEach(delChild => delChild.classList.remove("active"));

        parent.forEach(child =>{

            if(child.dataset[data] === item){
                child.classList.add("active");
            }
        })
       

    }
}

//reset theme settings: from page + local storage
document.getElementById("reset").onclick = function(){

    deleteFromLocalStorage("font-size","main-color","main-background","color-text","body-color");

    window.location.reload();

};

//function: delete from local storage
function deleteFromLocalStorage(...items){

    for(let i = 0; i < items.length; i++){
        window.localStorage.removeItem(items[i]);
    }
}

/*--------------------- end theme ----------------------*/
