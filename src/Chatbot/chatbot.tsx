
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
const getChatItems = async() => {
const Doc = await getDoc(doc(dbh, 'Users', auth.currentUser.uid))
console.log(Doc)
// Doc.info.ChatLogs.forEach((time)=> {if (time > max){
//     setMax(time)
// }


// })
}
getChatItems()
}, [doc(dbh, 'Users', auth.currentUser.uid)])

}
export default handleChatbotReq
export {ChatbotReq}