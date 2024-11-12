
import reactDom from "react-dom/client"
import App from "./App"
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from "react";



const root = reactDom.createRoot(document.getElementById("root"))


export const MyContext2 = createContext()

const username = "nimirita"

root.render(

    <MyContext2.Provider value={username}>

            <App/>


    </MyContext2.Provider>

   

)