const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-primary/30"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin"></div>
      </div>
    </div>
  )
}

export default Spinner
