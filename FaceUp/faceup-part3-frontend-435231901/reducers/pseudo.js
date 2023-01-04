export default function(pseudo = null, action) {
  if(action.type == 'savePseudo') {
      return action.pseudo;
  } else {
      return pseudo;
  }
}