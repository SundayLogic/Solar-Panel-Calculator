import ButtonIncrement from "./components/atoms/buttons/ButtonIncrement";

function App() {
  return (
    <div className='w-[100vw] h-[100vh] bg-black text-white flex items-center justify-center'>
      <h1>Project</h1>
      <ButtonIncrement>Click</ButtonIncrement>
    </div>
  )
}

export default App;
