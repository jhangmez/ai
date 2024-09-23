import React from 'react'
import { Textarea } from '@nextui-org/input'
interface AbstractInputProps {
  value: string
  onChange: (value: string) => void
}

const AbstractInput: React.FC<AbstractInputProps> = ({ value, onChange }) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor='abstract'
        className='block text-sm font-medium text-light-outline dark:text-dark-outline'
      >
        Abstract
      </label>
      <Textarea
        id='abstract'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        placeholder='Ingrese el abstract aquí'
      />
    </div>
  )
}

export default AbstractInput
