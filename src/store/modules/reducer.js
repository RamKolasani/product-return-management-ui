

export const initialState = {
    coreBusinessRulesList: [{ "id": "1", "sno": "1", "title": "Restock", "description": "Restock the product into inventory" },{ "id": "2", "sno": "2", "title": "Refurbish", "description": "Repair the product and sell second time" },{ "id": "3", "sno": "3", "title": "Dispose", "description": "Product beyond repair. to be recycled" }],
    businessRulesList: [{ "id": "11", "sno": "11", "title": "Return to Seller", "description": "Product is good to restock. Return to Seller", "associatedCoreBusinessRule": 'Restock' },{ "id": "12", "sno": "12", "title": "Restock in Inventory", "description": "Return product to inventory", "associatedCoreBusinessRule": 'Restock' },{ "id": "13", "sno": "13", "title": "Refurbish to Auction", "description": "Refurbish product and log into aution items", "associatedCoreBusinessRule": 'Refurbish' }],
    categoriesList: [{ "id": "1", "sno": "1", "title": "Electronics", "description": "electronics" }],
    productClassList:[{"id":"21","sno":"21","title":"Laptop","keywords":"laptop,computer,pc","appliedRules":"Restock,Refurbish,Dispose","appliedQuestionnaires":"Is the device turning on?"},{"id":"22","sno":"22","title":"Mobile","keywords":"Mobile,Phone,Cell,Cellphone","appliedRules":"Restock,Refurbish,Dispose","appliedQuestionnaires":"Is the device turning on?"}],
    questionnairesList : [{
        "id":"1","options":[{"option":"Yes","destination":"Refurbish"},{"option":"No","destination":"Restock"}],"productClass":"Laptop","question":"Is the device in apt condition?"
    },{
        "id":"2","options":[{"option":"Yes","destination":"Refurbish"},{"option":"Minor wear & tear","destination":"Refurbish"},{"option":"No","destination":"Restock"}],"productClass":"Laptop","question":"Are there any physical damage?"
    }],
    returnsList : [{
        "id":"1",
        "orderRef":"3279486",
        "productTitle":"iPhone 11 Pro",
        "productDescription":"iPhone 11 Pro, 256 GB, Matt Black",
        "productClass":"Mobiles",
        "appliedAction":"Restock"
    },{
        "id":"2",
        "orderRef":"3279498",
        "productTitle":"MacBook 2019",
        "productDescription":"MacBook 2019, 1TB, 14inch, Silver",
        "productClass":"Computer",
        "appliedAction":"Refurbish"
    },{
        "id":"3",
        "orderRef":"1279596",
        "productTitle":"Syska 12W LED",
        "productDescription":"Syska 12 Watts LED Bulb, White",
        "productClass":"Electrical",
        "appliedAction":"Dispose"
    },{
        "id":"4",
        "orderRef":"2794860",
        "productTitle":"Sandisk Pendrive",
        "productDescription":"Sandisk 32 GB, USB 3.0",
        "productClass":"Accessories",
        "appliedAction":"Restock"
    }]
}

const productReturn = (
    prevState = initialState,
    action
) => {
    switch (action.type) {
        case "ADD_CBR":
            return {
                ...prevState,
                coreBusinessRulesList: [...prevState.coreBusinessRulesList, action.payload]
            }
        case "ADD_BR":
            return {
                ...prevState,
                businessRulesList: [...prevState.businessRulesList, action.payload]
            }
        case "DELETE_CBR":
            return {
                ...prevState,
                coreBusinessRulesList: prevState.coreBusinessRulesList.filter(item => item.id != action.payload)
            }
        case "DELETE_BR":
            return {
                ...prevState,
                businessRulesList: prevState.businessRulesList.filter(item => item.id != action.payload)
            }

        case "EDIT_CBR":
            return {
                ...prevState,
                coreBusinessRulesList: [...prevState.coreBusinessRulesList.filter(item => item.id != action.payload.id), action.payload]
            }

        case "EDIT_BR":
            return {
                ...prevState,
                businessRulesList: [...prevState.businessRulesList.filter(item => item.id != action.payload.id), action.payload]
            }
        case "ADD_CATEGORY":
            return {
                ...prevState,
                categoriesList: [...prevState.categoriesList, action.payload]
            }
        case "EDIT_CATEGORY":
            return {
                ...prevState,
                categoriesList: [...prevState.categoriesList.filter(item => item.id != action.payload.id), action.payload]
            }
        case "DELETE_CATEGORY":
            return {
                ...prevState,
                categoriesList: prevState.categoriesList.filter(item => item.id != action.payload)
            }
            case "ADD_PC":
            return {
                ...prevState,
                productClassList: [...prevState.productClassList, action.payload]
            }
        case "DELETE_PC":
            return {
                ...prevState,
                productClassList: prevState.productClassList.filter(item => item.id != action.payload)
            }
        case "ADD_Q":
            return {
                ...prevState,
                questionnairesList : [...prevState.questionnairesList, action.payload]
            }
        default:
            return prevState

    }
}

export default productReturn;
