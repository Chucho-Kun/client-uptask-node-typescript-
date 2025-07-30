import '@/layouts/Loader.css'

export default function Loader() {
  return (
    <>
      <h1 className='text-center mt-10'>CARGANDO...</h1>
      <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
      </div>
    </>
  )
}
