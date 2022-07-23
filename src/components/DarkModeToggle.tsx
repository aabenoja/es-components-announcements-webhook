import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

export const DarkModeToggle: FC<{ className: string; }> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked);
  }, [setIsDarkMode]);

  return (
    <div {...props}>
      <label className="inline-flex relative items-center cursor-pointer">
        <input className="sr-only peer" type="checkbox" role="switch" onChange={onChangeHandler} checked={isDarkMode} />
        <div
          className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        />
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Enable Dark Mode
        </span>
      </label>
    </div>
  );
}
