import { useNavigate } from 'react-router-dom';

const PageRoot = () => {
  const navigate = useNavigate();

  return (
    <div className={'w-screen h-screen flex flex-col items-center justify-center gap-4'}>
      <button className={'px-3 py-1 rounded-1 text-xl'} onClick={() => navigate('/one')}>ONE</button>
      <button className={'px-3 py-1 rounded-1 text-xl'} onClick={() => navigate('/two')}>TWO</button>
    </div>
  );
};
export default PageRoot;