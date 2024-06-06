import { useState } from 'react';

const useSettingsForUser = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');

  const editProfile = () => {
    setIsEdit(!isEdit);
  };
  const handleSetting = (
    value: string | undefined,
    name: string,
    type: string
  ) => {
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
    editProfile,
    handleSetting,
  };
};

export default useSettingsForUser;
