import { Suspense } from 'react'
import { useRoutes } from "react-router-dom";
import routes from './router/index'


function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <Suspense fallback=''>
          {useRoutes(routes)}
        </Suspense>
      </div>
    </>
  )
}

export default App
