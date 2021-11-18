import { enhancementAction } from ".."


export const addCoreBusinessRuleAction = (rule) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "ADD_CBR",
        payload: rule
    })
})

export const editCoreBusinessRuleAction = (rule) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "EDIT_CBR",
        payload: rule
    })
})

export const deleteCoreBusinessRuleAction = (ruleId) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "DELETE_CBR",
        payload: ruleId
    })
})

export const addBusinessRuleAction = (rule) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "ADD_BR",
        payload: rule
    })
})

export const editBusinessRuleAction = (rule) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "EDIT_BR",
        payload: rule
    })
})

export const deleteBusinessRuleAction = (ruleId) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "DELETE_BR",
        payload: ruleId
    })
})


export const addCategoryAction = (category) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "ADD_CATEGORY",
        payload: category
    })
})

export const editCategoryAction = (category) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "EDIT_CATEGORY",
        payload: category
    })
})

export const deleteCategoryAction = (categoryId) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "DELETE_CATEGORY",
        payload: categoryId
    })
})



export const addProductClassAction = (productClass) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "ADD_PC",
        payload: productClass
    })
})

export const deleteProductClassAction = (productClassId) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "DELETE_PC",
        payload: productClassId
    })
})

export const addQuestionnaireAction = (questionnaire) => enhancementAction(async (dispatch, getState) => {
    dispatch({
        type: "ADD_Q",
        payload: questionnaire
    })
})


// export const setAppFacilityId = (facilityId) => enhancementAction(async (dispatch, getState) => {
//     dispatch({
//         type: SET_FACILITY_ID,
//         payload: facilityId
//     })
// })

// export const clearStagingConfig = () => enhancementAction(async (dispatch, getState) => {
//     dispatch({
//         type: CLEAR_STAGING_CONFIG
//     })
// })
