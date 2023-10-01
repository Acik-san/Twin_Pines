import { useRef, useState } from 'react';
import { useClickOutside } from './index';

const useSettingsForUser = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setIsEdit(false));

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
