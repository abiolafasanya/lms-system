import {
  MdDarkMode,
  MdLightMode,
  MdLightbulbOutline,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

const Toggle = ({ action, className }: any) => {
  const { theme, setTheme } = useTheme();
  const iconClass = classNames(
    'mr-auto  rounded-full w-5 h-5 p-1 transition-all ease-in-out duration-1000',
    {
      '-ml-[0.95rem] text-white bg-gray-500': theme === 'light',
      'ml-[1rem]': theme === 'dark',
      'text-orange-50 bg-gray-500': theme === 'dark',
    }
  );
  return (
    <div className="mx-4">
      {/* <input
        className="appearance-none w-9 rounded-full h-5 focus:outline-none cursor-pointer shadow-sm"
        type="checkbox"
        role="switch"
        onClick={action}
      /> */}
      <button onClick={action} className={className + 'flex w-14'}>
        {theme === 'light' && <MdOutlineDarkMode className={iconClass} />}
        {theme === 'dark' && <MdLightMode className={iconClass} />}
      </button>
    </div>
  );
};

export default Toggle;
