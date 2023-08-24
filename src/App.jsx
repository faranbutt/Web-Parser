import Main from "./components/Main/Main"
import Navbar from "./components/Navbar/Navbar"


function App() {

  return (
   <>
   <div className="w-screen h-full bg-gradient-to-br from-blue-400 to-white">
   <div className="mb-4">
          <Navbar />
    </div>
    <div>
      <Main />
    </div>
   </div>
   </>
  )
}

export default App
