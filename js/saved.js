
//select elements
let savedContent = document.querySelector("div.saved");

//if there is no saved posts show paragraph
if(savedContent.innerHTML === ""){

    //create paragraph
    let paragraph = document.createElement("p");
    paragraph.className = "no-saved";
    paragraph.innerHTML = "No Saved Posts";
    savedContent.appendChild(paragraph);
}

let savedPosts = window.localStorage.getItem("saved-boxes");


if(savedPosts){
    let data = JSON.parse(savedPosts);

    console.log(data)
    for(let i = 0; i < data.length; i++){

        let box = document.createElement("div");
        box.className = "box";
        box.id = data[i].id;
        box.innerHTML = data[i].content;

        savedContent.appendChild(box);
    }
}


        