export const initialState = null;

export const reducre = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }
    return state;
}