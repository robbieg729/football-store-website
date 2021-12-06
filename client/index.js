const templates = document.querySelectorAll(".template");
const setTemplatesVisibility = function(visibleTemplateId){
    templates.forEach(template =>{
        if (template.id != visibleTemplateId){
            template.style.display = "none";
        }
        else{
            template.style.display = "initial";
        }
    });
}
const resetList = function(partialId){
    let container = document.getElementById(partialId + "Container");
    let rowArray = container.querySelectorAll(".row");
    let breaksArray = container.querySelectorAll("br");
    let h3Array = document.getElementById(partialId + "Row1").querySelectorAll("h3");
    rowArray.forEach(row =>{
        if (row.id != partialId + "Row1"){
            container.removeChild(row);
        }
    });
    breaksArray.forEach(br =>{
        if (br.id != partialId + "TopBr"){
            container.removeChild(br);
        }
    });
    h3Array.forEach(h3 =>{
        document.getElementById(partialId + "Row1").removeChild(h3);
    });
}
const loadItemList = function(itemList, partialId){
    for (let i = 0; i < itemList.length; i++){
        document.getElementById(partialId + "Img" + (i + 1).toString()).setAttribute("src", itemList[i].image);
        document.getElementById(partialId + "Title" + (i + 1).toString()).innerHTML = itemList[i].description;
        document.getElementById(partialId + "ImgA" + (i + 1).toString()).setAttribute("href", "#items/" + itemList[i].type + "/" + itemList[i].id)
        document.getElementById(partialId + "A" + (i + 1).toString()).setAttribute("href", "#items/" + itemList[i].type + "/" + itemList[i].id);
        document.getElementById(partialId + "Price" + (i + 1).toString()).innerHTML = "Price: " + itemList[i].price;
        document.getElementById(partialId + "SellerA" + (i + 1).toString()).setAttribute("href", "#sellers/" + itemList[i].seller_id + "?sortOption=none");
        document.getElementById(partialId + "Seller" + (i + 1).toString()).innerHTML = "Seller: " + itemList[i].seller_name; 
    }
}
const loadHomePage = function(newestItems){
    setTemplatesVisibility("home");
    if (newestItems.length < 6){
        for (let i = 6; i > newestItems.length; i--){
            document.getElementById("newItemsCol" + i.toString()).style.display = "none";
        }
        for (let i = 1; i <= newestItems.length; i++){
            document.getElementById("newItemsCol" + i.toString()).style.display = "initial";
        }
        loadItemList(newestItems, "newItems");
    }
    else if (newestItems.length > 6){
        loadItemList(newestItems.slice(0, 6), "newItems");
    }    
}
const loadItemListPage = function(itemList, hash){
    setTemplatesVisibility("itemList");
    if (hash.includes("#items?")){
        document.getElementById("itemListHeader").innerHTML = "ITEMS";
    }
    else{
        document.getElementById("itemListHeader").innerHTML = hash.substring(7, hash.indexOf("?")).toUpperCase();
    }
    let partialLink = hash.substring(0, hash.indexOf("?"));
    document.getElementById("noneSortItemsA").setAttribute("href", partialLink + "?sortOption=none");
    document.getElementById("priceAscSortA").setAttribute("href", partialLink + "?sortOption=priceAscending");
    document.getElementById("priceDescSortA").setAttribute("href", partialLink + "?sortOption=priceDescending");
    document.getElementById("sizeAscSortA").setAttribute("href", partialLink + "?sortOption=sizeAscending");
    document.getElementById("sizeDescSortA").setAttribute("href", partialLink + "?sortOption=sizeDescending");
    resetList("itemList"); 
    let container = document.getElementById("itemListContainer");     
    // let container = document.getElementById("itemListContainer");
    // let rowArray = container.querySelectorAll(".row");
    // let breaksArray = container.querySelectorAll("br");
    // let h3Array = document.getElementById("itemListRow1").querySelectorAll("h3");
    // rowArray.forEach(row =>{
    //     if (row.id != "itemListRow1"){
    //         container.removeChild(row);
    //     }
    // });
    // breaksArray.forEach(br =>{
    //     if (br.id != "itemListTopBr"){
    //         container.removeChild(br);
    //     }
    // });
    // h3Array.forEach(h3 =>{
    //     document.getElementById("itemListRow1").removeChild(h3);
    // });
    if (itemList.length < 6){
        for (let i = 6; i > itemList.length; i--){
            document.getElementById("itemList" + i.toString()).style.display = "none";
        }
        if (itemList.length == 0){
            let message = document.createElement("h3");
            message.style.color = "grey";
            message.id = "itemListMessage";
            message.innerHTML = "No items found";
            document.getElementById("itemListRow1").appendChild(message);
        }        
    }
    else{
        if (itemList.length != 6){
            for (let j = 1; j <= Math.ceil((itemList.length - 6) / 6); j++){
                let newRow = document.createElement("div");
                newRow.setAttribute("class", "row row-cols-1 row-cols-md-6 g-4");
                let br = document.createElement("br");
                container.appendChild(br);
                let upperBound = itemList.length;
                if ((6 * (j + 1)) < itemList.length){
                    upperBound = 6 * (j + 1);
                }
                for (let i = 6 * j + 1; i <= upperBound; i++){
                    let strNum = i.toString();            
                    let newCol = document.createElement("div");
                    newCol.setAttribute("class", "col");
                    newCol.id = "itemList" + strNum;
                    let newImgA = document.createElement("a");
                    newImgA.id = "itemListImgA" + strNum;
                    let newImg = document.createElement("img");
                    newImg.setAttribute("class", "img-fluid item-list-img");
                    newImg.id = "itemListImg" + strNum;
                    newImgA.appendChild(newImg);
                    let newA = document.createElement("a");
                    newA.id = "itemListA" + strNum;
                    let newH4 = document.createElement("h4");
                    newH4.setAttribute("class", "item-title");
                    let newStrong = document.createElement("strong");
                    newStrong.id = "itemListTitle" + strNum;
                    newH4.appendChild(newStrong);
                    newA.appendChild(newH4);
                    let newPriceH6 = document.createElement("h6");
                    newPriceH6.setAttribute("class", "price-text");
                    newPriceH6.id = "itemListPrice" + strNum;
                    let newSellerA = document.createElement("a");
                    newSellerA.id = "itemListSellerA" + strNum;
                    let newSellerH6 = document.createElement("h6");
                    newSellerH6.setAttribute("class", "seller-text");
                    newSellerH6.id = "itemListSeller" + strNum;
                    newSellerA.appendChild(newSellerH6);
                    newCol.appendChild(newImgA);
                    newCol.appendChild(newA);
                    newCol.appendChild(newPriceH6);
                    newCol.appendChild(newSellerA);
                    newRow.appendChild(newCol);
                }
                container.appendChild(newRow);
            }            
        }        
    }
    for (let i = 1; i <= itemList.length; i++){
        document.getElementById("itemList" + i.toString()).style.display = "initial";
    }
    loadItemList(itemList, "itemList");
}
const loadSingleItemPage = function(items, itemType){
    setTemplatesVisibility("singleItem");
    let displayItem = items[0];
    document.getElementById("singleItemDescription").innerHTML = displayItem.description;
    document.getElementById("singleItemImg").setAttribute("src", displayItem.image);
    document.getElementById("singleItemPrice").innerHTML = "Price: " + displayItem.price;
    document.getElementById("singleItemSeller").innerHTML = "Seller: " + displayItem.seller_name;
    document.getElementById("singleItemSellerLink").setAttribute("href", "#sellers/" + displayItem.seller_id + "?sortOption=none");
    document.getElementById("singleItemSizeChart").innerHTML = document.getElementById(itemType + "Table").innerHTML;
    for (let i = 4; i > items.length - 1; i--) {
        document.getElementById("relatedItemsCol" + i.toString()).style.display = "none";        
    }   
    for (let i = 1; i <= items.length - 1; i++){
        document.getElementById("relatedItemsCol" + i.toString()).style.display = "initial";
    }
    for (let i = 1; i < items.length; i++) {
        document.getElementById("relatedItemsImg" + i.toString()).setAttribute("src", items[i].image);
        document.getElementById("relatedItemsImgA" + i.toString()).setAttribute("href", "#items/" + items[i].type + "/" + items[i].id)
        document.getElementById("relatedItemsA" + i.toString()).setAttribute("href", "#items/" + items[i].type + "/" + items[i].id);
        document.getElementById("relatedItemsTitle" + i.toString()).innerHTML = items[i].description;       
    }
}
const loadSellersPage = function(sellers, numOfItemsBySeller){
    setTemplatesVisibility("sellersList");
    resetList("sellersList");
    let container = document.getElementById("sellersListContainer");
    if (sellers.length < 6){
        for (let i = 6; i > sellers.length; i--){
            document.getElementById("sellersList" + i.toString()).style.display = "none";
        }
        if (sellers.length == 0){
            let message = document.createElement("h3");
            message.style.color = "grey";
            message.id = "sellersListMessage";
            message.innerHTML = "No sellers found";
            document.getElementById("sellersListRow1").appendChild(message);
        }  
    }
    else{
        if (sellers.length != 6){
            for (let j = 1; j <= Math.ceil((sellers.length - 6) / 6); j++){
                let newRow = document.createElement("div");
                newRow.setAttribute("class", "row row-cols-1 row-cols-md-6 g-4");
                let br = document.createElement("br");
                container.appendChild(br);
                let upperBound = sellers.length;
                if ((6 * (j + 1)) < sellers.length){
                    upperBound = 6 * (j + 1);
                }
                for (let i = 6 * j + 1; i <= upperBound; i++){
                    let strNum = i.toString();            
                    let newCol = document.createElement("div");
                    newCol.setAttribute("class", "col");
                    newCol.id = "sellersList" + strNum;
                    let newH4 = document.createElement("h4");
                    let newStrong = document.createElement("strong");
                    newStrong.id = "sellersListName" + strNum;
                    newH4.appendChild(newStrong);
                    let newNumH6 = document.createElement("h6");
                    newNumH6.id = "sellersListNum" + strNum;
                    let newA = document.createElement("a");
                    newA.id = "sellersListVP" + strNum;
                    newA.setAttribute("class", "profile-link");
                    let newVPH6 = document.createElement("h6");
                    newVPH6.innerHTML = "View profile";
                    newA.appendChild(newVPH6);
                    newCol.appendChild(newH4);
                    newCol.appendChild(newNumH6);
                    newCol.appendChild(newA);
                    newRow.appendChild(newCol);
                }
                container.appendChild(newRow);
            }            
        }
    }
    for (let i = 1; i <= sellers.length; i++){
        document.getElementById("sellersList" + i.toString()).style.display = "initial";
        document.getElementById("sellersListName" + i.toString()).innerHTML = sellers[i - 1].firstName + " " + sellers[i - 1].lastName;
        document.getElementById("sellersListNum" + i.toString()).innerHTML = "Number of items listed: " + numOfItemsBySeller[i - 1];
        document.getElementById("sellersListVP" + i.toString()).setAttribute("href", "#sellers/" + sellers[i - 1].id + "?sortOption=none");
    }
    // let container = document.getElementById("sellersListContainer");
    // let rowArray = container.querySelectorAll(".row");
    // let breaksArray = container.querySelectorAll("br");
    // let h3Array = container.querySelectorAll("h3");
    // rowArray.forEach(row =>{
    //     if (row.id != "sellersListRow1"){
    //         container.removeChild(row);
    //     }
    // });
    // breaksArray.forEach(br =>{
    //     if (br.id != "sellersListTopBr"){
    //         container.removeChild(br);
    //     }
    // });
    // h3Array.forEach(h3 =>{
    //     document.getElementById("sellersListRow1").removeChild(h3);
    // });
}
const loadSingleSellerPage = function(seller, items){
    setTemplatesVisibility("singleSeller");
    document.getElementById("singleSellerId").innerHTML = "ID: " + seller.id;
    document.getElementById("singleSellerName").innerHTML = "Name: " + seller.firstName + " " + seller.lastName;
    document.getElementById("singleSellerContact").innerHTML = "Contact: " + seller.email;
    document.getElementById("singleSellerItemsTitle").innerHTML = "Items (" + items.length + "):";
    document.getElementById("noneSellerItemsSortA").setAttribute("href", "#sellers/" + seller.id + "?sortOption=none");
    document.getElementById("priceAscSellerItemsSortA").setAttribute("href", "#sellers/" + seller.id + "?sortOption=priceAscending");
    document.getElementById("priceDescSellerItemsSortA").setAttribute("href", "#sellers/" + seller.id + "?sortOption=priceDescending");
    document.getElementById("sizeAscSellerItemsSortA").setAttribute("href", "#sellers/" + seller.id + "?sortOption=sizeAscending");
    document.getElementById("sizeDescSellerItemsSortA").setAttribute("href", "#sellers/" + seller.id + "?sortOption=sizeDescending");
    let outerCol = document.getElementById("singleSellerItemsCol");
    let rows = outerCol.querySelectorAll(".row");
    rows.forEach(row =>{
        if (row.id != "singleSellerItemsRow1"){
            outerCol.removeChild(row);
        }
    });
    outerCol.querySelectorAll("br").forEach(br =>{
        if (br.id != "singleSellerItemsBr"){
            outerCol.removeChild(br);
        }
    });
    if (items.length < 4){
        for (let i = 4; i > items.length; i--){
            document.getElementById("singleSellerItemsCol" + i.toString()).style.display = "none";
        }
    }
    else{
        if (items.length != 4){            
            for (let j = 1; j <= Math.ceil((items.length - 4) / 4); j++){                
                let newRow = document.createElement("div");
                newRow.setAttribute("class", "row row-cols-1 row-cols-md-4 g-4");
                let br = document.createElement("br");
                outerCol.appendChild(br);
                let upperBound = items.length;
                if ((4 * (j + 1)) < items.length){
                    upperBound = 4 * (j + 1);
                }
                for (let i = 4 * j + 1; i <= upperBound; i++){
                    let strNum = i.toString();
                    let newCol = document.createElement("div");
                    newCol.setAttribute("class", "col");
                    newCol.id = "singleSellerItemsCol" + strNum;
                    let newImgA = document.createElement("a");
                    newImgA.id = "singleSellerItemsImgA" + strNum;
                    let newImg = document.createElement("img");
                    newImg.setAttribute("class", "img-fluid related-item-img");
                    newImg.id = "singleSellerItemsImg" + strNum;
                    newImgA.appendChild(newImg);
                    let newTitleA = document.createElement("a");
                    newTitleA.id = "singleSellerItemsA" + strNum;
                    let newH6 = document.createElement("h6");
                    newH6.setAttribute("class", "item-title");
                    let newStrong = document.createElement("strong");
                    newStrong.id = "singleSellerItemsTitle" + strNum;
                    newH6.appendChild(newStrong);
                    newTitleA.appendChild(newH6);
                    let newPriceText = document.createElement("h6");
                    newPriceText.id = "singleSellerItemsPrice" + strNum;
                    newCol.appendChild(newImgA);
                    newCol.appendChild(newTitleA);
                    newCol.appendChild(newPriceText);
                    newRow.appendChild(newCol); 
                }
                outerCol.appendChild(newRow);
            }
        }
    }
    for (let i = 1; i <= items.length; i++){
        document.getElementById("singleSellerItemsCol" + i.toString()).style.display = "initial";
        document.getElementById("singleSellerItemsImgA" + i.toString()).setAttribute("href", "#items/" + items[i - 1].type + "/" + items[i - 1].id);
        document.getElementById("singleSellerItemsA" + i.toString()).setAttribute("href", "#items/" + items[i - 1].type + "/" + items[i - 1].id);
        document.getElementById("singleSellerItemsImg" + i.toString()).setAttribute("src", items[i - 1].image);
        document.getElementById("singleSellerItemsTitle" + i.toString()).innerHTML = items[i - 1].description;
        document.getElementById("singleSellerItemsPrice" + i.toString()).innerHTML = "Price: " + items[i - 1].price;
    }
}
const loadPageContentByHash = async function(hash){
    if (hash == ""){
        try{
            let response = await fetch("http://127.0.0.1:8090/home");
            let newestItems = await response.json();
            loadHomePage(newestItems); 
        }
        catch(error){
            alert("Server disconnected unexpectedly.");
        }    
    }
    else if (hash == "#items/post"){
        setTemplatesVisibility("itemPostForm");
    }
    else if (hash == "#sellers/post"){
        setTemplatesVisibility("sellerPostForm");
    }
    else{
        try{
            let response = await fetch("http://127.0.0.1:8090/" + hash.substr(1));
            if (response.ok == false){
                setTemplatesVisibility("errorPage");
            }        
            else{
                let body = await response.json();        
                if (hash.includes("#items/gloves?") || hash.includes("#items/pads?") || hash.includes("#items/helmets?") || hash.includes("#items?")){        
                    loadItemListPage(body, hash);       
                }
                else if (hash.includes("#items/gloves/") || hash.includes("#items/pads/") || hash.includes("#items/helmets/")){    
                    loadSingleItemPage(body, body[0].type);
                }
                else if (hash.includes("#sellers?")){
                    loadSellersPage(body[0], body[1]);
                }
                else if (hash.includes("#sellers/")){
                    loadSingleSellerPage(body[0], body[1]);
                }
            }  
        }
        catch(error){
            alert("Server disconnected unexpectedly.");
        }      
    }  
}
const itemFormSubmitBtn = document.getElementById("itemFormSubmitBtn");
itemFormSubmitBtn.addEventListener("click", function(event){
    let errors = [];
    let i = 0;
    const formAnswers = document.getElementById("itemPostForm").querySelectorAll(".form-control");
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRe.test(document.getElementById("emailText").value) == false){
        errors[i] = "email address has an invalid format";
        i += 1;
    }
    if (document.getElementById("typeText").value != "Gloves" && document.getElementById("typeText").value != "Pads" && document.getElementById("typeText").value != "Helmet"){
        errors[i] = "type input not valid (must be Gloves, Pads, or Helmet)";
        i += 1;
    }
    if (document.getElementById("sizeText").value != "Small" && document.getElementById("sizeText").value != "Medium" && document.getElementById("sizeText").value != "Large"){
        errors[i] = "size input not valid (must be Small, Medium, or Large)";
        i += 1;
    }
    let priceRe = /^\d+\.\d{0,2}$/;
    if (priceRe.test(document.getElementById("priceText").value) == false){
        errors[i] = "price input not valid (must be a number with 2 decimal places)";
        i += 1;
    }
    for (let j = 0; j < formAnswers.length; j++) {
        if (formAnswers[j].value == ""){
            errors[i] = "some fields are empty";
            i += 1;
            break;
        }        
    }
    if (errors.length > 0){
        event.preventDefault();
        let errorMessage = "Form could not be submitted for the following reasons: ";
        for (let k = 0; k < errors.length; k++) {
            if (k == errors.length - 1){
                errorMessage += errors[k] + ". ";
            }
            else{
                errorMessage += errors[k] + "; ";
            }         
        }
        errorMessage += "Please try again.";
        alert(errorMessage);
    }
    else{
        alert("Item successfully listed.");
    }
});
const formSizeChartsBtn = document.getElementById("formSizeChartsA");
const formSizeChartCollapse = document.getElementById("sizeChartCollapse");
formSizeChartsBtn.addEventListener("click", function(){
    let itemType = document.getElementById("typeText").value;
    if (itemType == "Gloves"){
        formSizeChartCollapse.innerHTML = document.getElementById("glovesTable").innerHTML;
    }
    else if (itemType == "Pads"){
        formSizeChartCollapse.innerHTML = document.getElementById("padsTable").innerHTML;
    }
    else if (itemType == "Helmet"){
        formSizeChartCollapse.innerHTML = document.getElementById("helmetsTable").innerHTML;
    }
    else{
        formSizeChartCollapse.innerHTML = "<h6>Please select an item type to see size chart</h6>";
    }
});
const sellerFormSubmitBtn = document.getElementById("sellerFormSubmitBtn");
sellerFormSubmitBtn.addEventListener("click", function(event){
    let errors = [];
    let i = 0;
    const formAnswers = document.getElementById("sellerPostForm").querySelectorAll(".form-control");
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRe.test(document.getElementById("sellerFormEmailText").value) == false){
        errors[i] = "email address has an invalid format";
        i += 1;
    }
    for (let j = 0; j < formAnswers.length; j++){
        if (formAnswers[j].value == ""){
            errors[i] = "some fields are empty";
        }        
    }
    if (errors.length > 0){
        event.preventDefault();
        let errorMessage = "Form could not be submitted for the following reasons: ";
        for (let k = 0; k < errors.length; k++) {
            if (k == errors.length - 1){
                errorMessage += errors[k] + ". ";
            }
            else{
                errorMessage += errors[k] + "; ";
            }         
        }
        errorMessage += "Please try again.";
        alert(errorMessage);
    }
    else{
        alert("Seller successfully listed.");
    }
});
window.addEventListener("load", function(){
    loadPageContentByHash(location.hash);
});
window.addEventListener("hashchange", function(){
    loadPageContentByHash(location.hash);
});