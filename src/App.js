import Dashboard from './components/Dashboard'
import styled from 'styled-components'

const Wrapper = styled.div`
  height:100%;
  width:100%;
`
function App() {
  return (
    <Wrapper>
      <Dashboard />
    </Wrapper>
  );
}

export default App;
