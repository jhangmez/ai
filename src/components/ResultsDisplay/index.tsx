import React from 'react'

interface ResultsDisplayProps {
  results: {
    individualPercentages: number[]
    overallPercentage: number
  }
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className='mt-4'>
      <h2 className='text-xl font-semibold mb-2'>Resultados:</h2>
      {results.individualPercentages.map((percentage, index) => (
        <p key={index}>
          Objetivo {index + 1}: {percentage.toFixed(2)}%
        </p>
      ))}
      <p className='font-bold mt-2'>
        Porcentaje general: {results.overallPercentage.toFixed(2)}%
      </p>
    </div>
  )
}

export default ResultsDisplay
