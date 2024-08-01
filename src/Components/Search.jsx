import React, { useState } from 'react'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [btnTitle, setBtnTitle] = useState('Search');
  const [disabled, setDisable] = useState('');
  return (
    <div>
      <form>
        <div>
          <CustomInput inputAction={setSearchText} placeholder="Search an Item.." type="text" name="search" isRequired={true}/>
          <CustomButton title={btnTitle} width={100} icon_name="search" disabled={disabled}/>
        </div>
      </form>
    </div>
  )
}

export default Search
