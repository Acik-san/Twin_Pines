import { useEffect, useRef, useState } from 'react';

const useSettingsForUser = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsEdit(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const editProfile = () => {
    setIsEdit(!isEdit);
  };
  const handleSetting = (value, name, type) => {
    setIsEdit(true);
    !value ? setValue('') : setValue(value);
    setName(name);
    setType(type);
  };
  return {
    isEdit,
    name,
    value,
    type,
    containerRef,
    editProfile,
    handleSetting,
  };
};

export default useSettingsForUser;
