const initFilter = ''

const filterReducer = (state = initFilter, action) => {
  switch (action.type) {
    case 'FILTER_TEXT':
      return action.text
    default:
      return state
  }
}

export const filterText = text => {
  
  return {
    type: 'FILTER_TEXT',
    text: text
  }
}


export default filterReducer