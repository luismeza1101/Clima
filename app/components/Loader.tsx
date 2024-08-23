
const Loader = () => {
  return (
<div className  ="flex items-center justify-center  gap-2 w-full h-screen fixed">
  <div className  ="w-4 h-4 rounded-full bg-black animate-bounce"></div>
  <div className  ="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
  <div className  ="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
</div>
  )
}

export default Loader
