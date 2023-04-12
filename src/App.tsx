import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AppContainer from './containers/AppContainer'
import MainLayout from './containers/MainLayout'
import BasicTable from './examples/mui/BasicTable'
import DataGridDemo from './examples/mui/DataGridDemo'

const App = props => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route path="basic" element={<BasicTable />} />
            <Route path="grid" element={<DataGridDemo />} />
            <Route path = 'main' element = {<MainLayout/>}/>
          </Route>
          <Route path="test" element={<BasicTable />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
