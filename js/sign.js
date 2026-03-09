

const buttons = document.querySelectorAll(".s-btn");

buttons.forEach(button => {
    button.addEventListener("click", function () {

        buttons.forEach(btn => {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline");
        });

        this.classList.remove("btn-outline");
        this.classList.add("btn-primary");

        // add filter

        const filter = this.dataset.filter;
        allData(filter);

    });
});


const allData = (filter = "all") => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url).then((res) => res.json())
        .then((data) => {
            setTimeout(() => { displayAll(data.data, filter); }, 500);
        });
}


const displayAll = (posts, filter) => {

    // get the container
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";


    let count = 0;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];


        if (filter === "open" && !(post.priority === "high" || post.priority === "medium")) continue;
        if (filter === "close" && post.priority !== "low") continue;


        //priority,border

        let imgstatus = "";
        let cardborder = "";

        if (post.priority === "high" || post.priority === "medium") {
            imgstatus = "assets/Open-Status.png";
            cardborder = "border-top:4px solid #00A96E;";


        }
        else if (post.priority === "low") {
            // imgstatus = "assets/Closed-Status.png";
            imgstatus = "assets/Closed- Status .png";
            cardborder = "border-top:4px solid #4A00FF;";


        }

        const labelBtn = post.labels
            .map(label => `<button  class=" btn btn-active btn-warning label-btn rounded-2xl">${label}</button>`)
            .join("");

        const postCard = document.createElement("div");
        postCard.innerHTML = `
      <div class="post-card" onclick="loadCardDetail(${post.id})" style="${cardborder}">
                <div class="card-top mb-2">
                    <img src="${imgstatus}" alt="">
                    <button class="btn btn-soft btn-warning rounded-2xl"> ${post.priority}</button>
                </div>
                <h2 class="font-bold text-[#1F2937]">${post.title}</h2>
                <p class="text-[#64748B] mt-2 mb-2">${post.description}</p>
                <div class="labels mb-2">
                        ${labelBtn}
                </div>
                  <hr class="border-t border-gray-300 my-3">

                <p class="text-[#64748B]">#1by john_doe</p>
                <p class="text-[#64748B]">1/15/2024</p>
            </div>
      `;
        count++;


        postContainer.append(postCard);
    }
    const issueCount = document.getElementById("issue-count");
    issueCount.textContent = `${count} Issues`;

}
const loadCardDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const result = await fetch(url);
    const details = await result.json();
    displaywordDetails(details.data);
}

const displaywordDetails = (detail) => {
    console.log(detail);
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
    
    <div class="space-y-2">

     <h2 class="font-bold text-[#1F2937]"> ${detail.title}</h2>
     <div class="">
        <button class="btn btn-active btn-info rounded-2xl" > ${detail.status}</button>
        <h3>Opened by Fahim Ahmed  22/02/2026 </h3>

     </div>

     <div>
                <button class="btn btn-outline  btn-warning rounded-2xl">Bug</button>
                <button class ="btn btn-outline btn-warning rounded-2xl">Help Wanted</button>
    </div>
        <p class="text-[#64748B] mt-2 mb-2">${detail.description}</p>
<div class="flex flex-row justify-between">
     <div class="flex flex-col gap-2">
            <h3 class="text-[#64748B]">Assignee:</h3>
         <h3 class=" text-[#1F2937]">Fahim Ahmed</h3>
    </div>
                        <div>
                            <h3  class="text-[#64748B]">Priority:</h3>
                            <button class="btn btn-active btn-info rounded-2xl">${detail.priority}</button>
                        </div>
     </div>               
            

</div>
        
    
    
    `;
    document.getElementById("post_modal").showModal();
};

allData()