import { ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/style.css';
import { useRoutes, RouteObject, BrowserRouter } from 'react-router-dom';
import PageOne from './pages/one';

const ROUTES: RouteObject[] = [
  { path: '/', element: <h1>Hello World</h1> },
  { path: 'one', element: <PageOne /> },
];

function App() {
  const routes = useRoutes(ROUTES);

  return (
    <div className={'w-screen h-screen relative'}>
      {routes}
    </div>
  );
}

export default () =>
  <ReactFlowProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactFlowProvider>
;
