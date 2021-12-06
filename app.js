var sellers = require("./sellers.json");
var items = require("./items.json");
const express = require("express");
const multer = require("multer");
var upload = multer({dest:"client/Images/Items/"});
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("client"));
const findLastIdInArray = function(array){
    let lastId = 0;
    if (array.length > 0){
        lastId = parseInt(array[array.length - 1].id);
    }
    return lastId;
}
const sortItemsByPrice = function(items, order){
    for (let j = 1; j < items.length; j++) {
        let x = items[j];
        let i = j - 1;
        if (order == "ascending"){
            while (i > -1 && parseFloat(items[i].price.substring(1)) > parseFloat(x.price.substring(1))){
                items[i + 1] = items[i];
                i -= 1;
            }
        }
        else{
            while (i > -1 && parseFloat(items[i].price.substring(1)) < parseFloat(x.price.substring(1))){
                items[i + 1] = items[i];
                i -= 1;
            }
        }
        items[i + 1] = x;        
    }
    return items;
}
const sortItemsBySize = function(items, order){
    let smallItems = [];
    let smallItemsCtr = 0;
    let mediumItems = [];
    let mediumItemsCtr = 0;
    let largeItems = [];
    let largeItemsCtr = 0;
    items.forEach(item =>{
        if (item.description.includes("Small")){
            smallItems[smallItemsCtr] = item;
            smallItemsCtr += 1;
        }
        else if (item.description.includes("Medium")){
            mediumItems[mediumItemsCtr] = item;
            mediumItemsCtr += 1;
        }
        else{
            largeItems[largeItemsCtr] = item;
            largeItemsCtr += 1;
        }
    });
    let sortedItems = [];
    let sortedItemsCtr = 0;
    for (let i = 0; i < smallItemsCtr; i++) {
        sortedItems[sortedItemsCtr] = smallItems[i];
        sortedItemsCtr += 1;       
    }
    for (let i = 0; i < mediumItemsCtr; i++) {
        sortedItems[sortedItemsCtr] = mediumItems[i];
        sortedItemsCtr += 1;       
    }
    for (let i = 0; i < largeItemsCtr; i++) {
        sortedItems[sortedItemsCtr] = largeItems[i];
        sortedItemsCtr += 1;       
    }
    if (order == "ascending"){
        return sortedItems;
    }
    else{
        return sortedItems.reverse();
    }
    
}
const sortSellersByNumOfItems = function(sellersArray, itemsNumBySeller, order){
    for (let j = 1; j < sellersArray.length; j++){
        let x = sellersArray[j];
        let y = itemsNumBySeller[j];
        let i = j - 1;
        if (order == "ascending"){
            while (i > -1 && itemsNumBySeller[i] > y){
                itemsNumBySeller[i + 1] = itemsNumBySeller[i];
                sellersArray[i + 1] = sellersArray[i];
                i -= 1; 
            }
        }
        else{
            while (i > -1 && itemsNumBySeller[i] < y){
                itemsNumBySeller[i + 1] = itemsNumBySeller[i];
                sellersArray[i + 1] = sellersArray[i];
                i -= 1; 
            }
        }        
        itemsNumBySeller[i + 1] = y;
        sellersArray[i + 1] = x;     
    }
    return [sellersArray, itemsNumBySeller];
}
app.get("/items", function(req, res){
    let responseArray = [];
    let i = 0;
    for (let j = 0; j < items.gloves.length; j++){
        responseArray[i] = items.gloves[j];
        i += 1;
    }
    for (let j = 0; j < items.pads.length; j++){
        responseArray[i] = items.pads[j];
        i += 1;
    }
    for (let j = 0; j < items.helmets.length; j++){
        responseArray[i] = items.helmets[j];
        i += 1;
    }
    let sortOption = req.query.sortOption;
    if (sortOption == "none"){
        res.status(200).send(responseArray);
    }
    else if (sortOption == "priceAscending"){
        res.status(200).send(sortItemsByPrice(responseArray, "ascending"));
    }
    else if (sortOption == "priceDescending"){
        res.status(200).send(sortItemsByPrice(responseArray, "descending"));
    }
    else if (sortOption == "sizeAscending"){
        res.status(200).send(sortItemsBySize(responseArray, "ascending"));
    }
    else if (sortOption == "sizeDescending"){
        res.status(200).send(sortItemsBySize(responseArray, "descending"));
    }
    else{
        res.sendStatus(404);
    }     
});
app.get("/items/:itemType", function(req, res){
    let itemType = req.params.itemType;
    let length = 0;
    if (itemType == "gloves"){
        length = items.gloves.length;
    }
    else if (itemType == "pads"){
        length = items.pads.length;
    }
    else{
        length = items.helmets.length;
    }
    let responseArray = new Array(length);
    if (itemType == "gloves"){
        for (let i = 0; i < items.gloves.length; i++) {
            responseArray[i] = items.gloves[i]     
        }
    }
    else if (itemType == "pads"){
        for (let i = 0; i < items.pads.length; i++) {
            responseArray[i] = items.pads[i]     
        }
    }
    else if (itemType == "helmets"){
        for (let i = 0; i < items.helmets.length; i++) {
            responseArray[i] = items.helmets[i]     
        }
    }
    if (responseArray != []){
        let sortOption = req.query.sortOption;
        if (sortOption == "none"){
            res.status(200).send(responseArray);
        }
        else if (sortOption == "priceAscending"){
            res.status(200).send(sortItemsByPrice(responseArray, "ascending"));
        }
        else if (sortOption == "priceDescending"){
            res.status(200).send(sortItemsByPrice(responseArray, "descending"));
        }
        else if (sortOption == "sizeAscending"){
            res.status(200).send(sortItemsBySize(responseArray, "ascending"));
        }
        else if (sortOption == "sizeDescending"){
            res.status(200).send(sortItemsBySize(responseArray, "descending"));
        } 
        else{
            res.sendStatus(404);
        }
    }
    else{
        res.sendStatus(404);
    }    
});
app.get("/items/:itemType/:itemId", function(req, res){
    let itemID = req.params.itemId;
    let itemType = req.params.itemType;
    let foundItem = false;
    let itemSellerName = "";
    let responseArray = []
    let i = 1
    const fillInitialResponseArray = function(itemArray){
        itemArray.forEach(item => {
            if (item.id == itemID){
                foundItem = true;
                itemSellerName = item.seller_name;
                responseArray[0] = item;
            }
            else{
                if (i < 5){
                    responseArray[i] = item;
                    i += 1;
                }                
            }
        });
    }
    const addSameSellerItems = function(itemArray){
        itemArray.forEach(item =>{
            if (item.seller_name == itemSellerName){
                if (i < 5){
                    responseArray[i] = item;
                    i += 1;
                }                    
            }
        });
    }
    if (itemType == "gloves"){
        fillInitialResponseArray(items.gloves);
        if (i < 5){
            addSameSellerItems(items.pads);
            if (i < 5){
                addSameSellerItems(items.helmets);
            }
        }
    }
    else if (itemType == "pads"){
        fillInitialResponseArray(items.pads);
        if (i < 5){
            addSameSellerItems(items.gloves);
            if (i < 5){
                addSameSellerItems(items.helmets);
            }
        }
    }
    else if (itemType == "helmets"){
        fillInitialResponseArray(items.helmets);
        if (i < 5){
            addSameSellerItems(items.gloves);
            if (i < 5){
                addSameSellerItems(items.pads);
            }
        }
    }
    else{
        res.sendStatus(404);
    }
    if (foundItem == false){
        res.sendStatus(404);
    }
    else{
        res.status(200).send(responseArray);
    }
});
app.get("/home", function(req, res){
    let responseArray = [];
    let lastId = Math.max(findLastIdInArray(items.gloves), findLastIdInArray(items.pads), findLastIdInArray(items.helmets));
    const checkItemArrayForId = function(array, searchId){
        for (let i = 0; i < array.length; i++) {
            if (parseInt(array[i].id) == searchId){
                return array[i];
            }            
        }
        return false;
    }
    let lowerBound = lastId - 5;
    if (lastId <= 6){
        lowerBound = 1;
    }
    for (let j = lastId; j >= lowerBound; j--) {
        let x = checkItemArrayForId(items.gloves, j);
        if (x == false){
            x = checkItemArrayForId(items.pads, j);
            if (x == false){
                responseArray[j - 1] = checkItemArrayForId(items.helmets, j);
            }
            else{
                responseArray[j - 1] = x;
            }
        }
        else{
            responseArray[j- 1] = x; 
        }            
    }
    responseArray.reverse();
    res.status(200).send(responseArray);
});
app.get("/sellers", function(req, res){
    let itemsNumBySellerArray = new Array(sellers.length);
    let sellersArray = new Array(sellers.length);
    for (let i = 0; i < sellers.length; i++) {
        sellersArray[i] = sellers[i];        
    }
    for (let i = 0; i < itemsNumBySellerArray.length; i++){
        itemsNumBySellerArray[i] = 0;
    }
    items.gloves.forEach(item =>{
        let itemSellerId = item.seller_id;
        for (let i = 0; i < sellers.length; i++){
            if (sellers[i].id == itemSellerId){
                itemsNumBySellerArray[i] += 1;
            }
        }
    });
    items.pads.forEach(item =>{
        let itemSellerId = item.seller_id;
        for (let i = 0; i < sellers.length; i++){
            if (sellers[i].id == itemSellerId){
                itemsNumBySellerArray[i] += 1;
            }
        }
    });
    items.helmets.forEach(item =>{
        let itemSellerId = item.seller_id;
        for (let i = 0; i < sellers.length; i++){
            if (sellers[i].id == itemSellerId){
                itemsNumBySellerArray[i] += 1;
            }
        }
    });
    let sortOption = req.query.sortOption;
    if (sortOption == "none"){
        res.status(200).send([sellersArray, itemsNumBySellerArray]);
    }
    else if (sortOption == "itemCountAscending"){
        res.status(200).send(sortSellersByNumOfItems(sellersArray, itemsNumBySellerArray, "ascending"));
    }
    else if (sortOption == "itemCountDescending"){
        res.status(200).send(sortSellersByNumOfItems(sellersArray, itemsNumBySellerArray, "descending"));
    }
    else{
        res.sendStatus(404);
    }
});
app.get("/sellers/:id", function(req, res){
    let id = req.params.id; 
    let foundSeller = false;
    let seller;
    for (let i = 0; i < sellers.length; i++) {
        if (sellers[i].id == id){
            seller = sellers[i];
            foundSeller = true;
            break;
        }        
    }
    let i = 0;
    let sellerItems = [];
    if (foundSeller == false){
        res.sendStatus(404);
    }    
    else{
        items.gloves.forEach(item =>{
            if (item.seller_id == id){
                sellerItems[i] = item;
                i += 1;
            }
        });
        items.pads.forEach(item =>{
            if (item.seller_id == id){
                sellerItems[i] = item;
                i += 1;
            }
        });
        items.helmets.forEach(item =>{
            if (item.seller_id == id){
                sellerItems[i] = item;
                i += 1;
            }
        });
        let sortOption = req.query.sortOption;
        if (sortOption == "none"){
            res.status(200).send([seller, sellerItems]);
        }
        else if (sortOption == "priceAscending"){
            let sortedItems = sortItemsByPrice(sellerItems, "ascending");
            res.status(200).send([seller, sortedItems]);
        }
        else if (sortOption == "priceDescending"){
            let sortedItems = sortItemsByPrice(sellerItems, "descending");
            res.status(200).send([seller, sortedItems]);
        }
        else if (sortOption == "sizeAscending"){
            let sortedItems = sortItemsBySize(sellerItems, "ascending");
            res.status(200).send([seller, sortedItems]);
        }
        else if (sortOption == "sizeDescending"){
            let sortedItems = sortItemsBySize(sellerItems, "descending");
            res.status(200).send([seller, sortedItems]);
        }
        else{
            res.sendStatus(404);
        }        
    }
});
app.post("/items/add", upload.single("image"), function(req, res){
    const identifyNewItemId = function(){            
        let newIdNum = Math.max(findLastIdInArray(items.gloves), findLastIdInArray(items.pads), findLastIdInArray(items.helmets)) + 1;
        let zeroes = "";
        for (let i = 1; i <= 6 - newIdNum.toString().length; i++) {
            zeroes += "0";
        }
        return zeroes + newIdNum.toString();
    }
    let itemSellerFirstName = req.body.firstName;
    let itemSellerLastName = req.body.lastName;
    let itemSellerEmail = req.body.email;
    let itemType = req.body.type;
    let itemDescription = req.body.description;
    let itemSize = req.body.size;
    let itemPrice = req.body.price;
    let itemImage = req.file;        
    let newItemId = identifyNewItemId();
    let sellerId = "";    
    let sellerAlreadyExists = false;
    for (let i = 0; i < sellers.length; i++) {
        if (sellers[i].email == itemSellerEmail){
            sellerAlreadyExists = true;
            sellerId = sellers[i].id;
            break;
        }            
    }
    if (sellerAlreadyExists == false){        
        if (sellers.length > 0){
            let newSellerIdNum = parseInt(sellers[sellers.length - 1].id) + 1;
            let zeroes = "";
            for (let i = 1; i <= 6 - newSellerIdNum.toString().length; i++) {
                zeroes += "0";
            }
            sellerId = zeroes + newSellerIdNum.toString();
        }
        else{
            sellerId = "000001";
        }
        sellers.push({id: sellerId, firstName: itemSellerFirstName, lastName: itemSellerLastName, email: itemSellerEmail});
    }
    if (itemType == "Gloves"){
        items.gloves.push({id: newItemId, description: itemDescription + " " + itemSize, type: "gloves", image: "Images/Items/" + itemImage.filename, price: "$" + itemPrice, seller_name: itemSellerFirstName + " " + itemSellerLastName, seller_id: sellerId});
    }
    else if (itemType == "Helmet"){
        items.helmets.push({id: newItemId, description: itemDescription + " " + itemSize, type: "helmets", image: "Images/Items/" + itemImage.filename, price: "$" + itemPrice, seller_name: itemSellerFirstName + " " + itemSellerLastName, seller_id: sellerId});  
    }
    else if (itemType == "Pads"){
        items.pads.push({id: newItemId, description: itemDescription + " " + itemSize, type: "pads", image: "Images/Items/" + itemImage.filename, price: "$" + itemPrice, seller_name: itemSellerFirstName + " " + itemSellerLastName, seller_id: sellerId}); 
    }
    res.status(200).redirect("/")          
});
app.post("/sellers/add", function(req, res){
    let newFirstName = req.body.firstName;
    let newLastName = req.body.lastName;
    let newEmail = req.body.email;
    let sellerAlreadyExists = false;
    for (let i = 0; i < sellers.length; i++) {
        if (sellers[i].email == newEmail){
            sellerAlreadyExists = true;
        }
    }
    if (sellerAlreadyExists == false){
        let sellerId = "";
        if (sellers.length > 0){
            let newSellerIdNum = parseInt(sellers[sellers.length - 1].id) + 1;
            let zeroes = "";
            for (let i = 1; i <= 6 - newSellerIdNum.toString().length; i++) {
                zeroes += "0";
            }
            sellerId = zeroes + newSellerIdNum.toString();
        }
        else{
            sellerId = "000001";
        }
        sellers.push({id: sellerId, firstName: newFirstName, lastName: newLastName, email: newEmail});
        res.status(200).redirect("/");
    }
    else{
        res.status(400).redirect("/");
    }
});
module.exports = app;