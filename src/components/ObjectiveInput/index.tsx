import React from 'react'
import { Input } from '@nextui-org/input'
interface ObjectiveInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const ObjectiveInput: React.FC<ObjectiveInputProps> = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className='mb-2'>
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        placeholder={placeholder}
      />
    </div>
  )
}

export default ObjectiveInput
