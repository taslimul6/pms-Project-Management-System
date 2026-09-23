
import './App.css'
import DashBoard from './Dash/DashBoard'
import Footer from './Footer'
import Nav from './Nav'


function App() {
 

  return (
    <>

    
     <Nav />
     
     <main  className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

      
      <DashBoard />

    

     


     </main>

     <Footer />
    </>
  )
}

export default App
