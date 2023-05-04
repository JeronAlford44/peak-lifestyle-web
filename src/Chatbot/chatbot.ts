
import { useEffect, useState } from "react"
import { auth, dbh } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

const ChatbotReq = () => {

}
const handleChatbotReq =() => {
    const [max, setMax] = useState(0)
    interface Tree {
info: {
    ChatLogs: {

    }
}
    }
useEffect(()=> {
type maxDate = Tree
const Doc = getDoc(doc(dbh, 'Users', auth.currentUser.uid))
console.log(Doc)
// Doc.info.ChatLogs.forEach((time)=> {if (time > max){
//     setMax(time)
// }


// })

}, [])
}
export {handleChatbotReq}
export default ChatbotReq