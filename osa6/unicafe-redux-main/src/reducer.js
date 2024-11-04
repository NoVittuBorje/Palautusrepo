const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let newstate = {
        good: state.good +1,
        ok: state.ok,
        bad: state.bad
      }
      return newstate

    case 'OK':
      let newstateok = {
        good: state.good ,
        ok: state.ok +1,
        bad: state.bad
      }
      return newstateok
      
    case 'BAD':
      let newstatebad = {
        good: state.good ,
        ok: state.ok,
        bad: state.bad +1
      }
      
        return newstatebad

    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
