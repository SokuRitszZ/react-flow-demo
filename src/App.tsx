import { ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/style.css';
import { useRoutes, RouteObject, BrowserRouter } from 'react-router-dom';
import PageOne from './pages/one';
import PageTwo from './pages/two';
import PageRoot from './pages';

const ROUTES: RouteObject[] = [
  { path: '/', element: <PageRoot /> },
  { path: 'one', element: <PageOne /> },
  { path: 'two', element: <PageTwo /> },
];

function App() {
  const routes = useRoutes(ROUTES);

  return (
    <div className={'w-screen h-screen'}>
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
