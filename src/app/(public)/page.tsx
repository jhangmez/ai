'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import LoadingIndicator from '@components/LoadingIndicator'
import { isModelLoaded } from '@utils/similarity'
import { Button, ButtonGroup } from '@nextui-org/button'

const AbstractInput = dynamic(() => import('@components/AbstractInput'))
const ObjectiveInput = dynamic(() => import('@components/ObjectiveInput'))
const ResultsDisplay = dynamic(() => import('@components/ResultsDisplay'))

export default function Home() {
  const [abstract, setAbstract] = useState('')
  const [objectives, setObjectives] = useState(['', '', '', '', ''])
  const [results, setResults] = useState<{
    individualPercentages: number[]
    overallPercentage: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModelReady, setIsModelReady] = useState(false)

  useEffect(() => {
    const checkModel = async () => {
      setIsModelReady(isModelLoaded())
      console.log('Modelo cargado:', isModelReady)
    }
    checkModel()
  }, [])

  const handleCalculate = async () => {
    setIsLoading(true)
    const validObjectives = objectives.filter((obj) => obj.trim() !== '')
    try {
      const response = await fetch('/api/calculate-similarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ abstract, objectives: validObjectives })
      })
      const similarity = await response.json()
      setResults(similarity)
    } catch (error) {
      console.error('Error calculating similarity:', error)
    }
    setIsLoading(false)
  }
  console.log('isModelReady:', isModelReady)
  console.log('isLoading:', isLoading)

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-light-primary dark:text-dark-primary'>
        Calculadora de Similitud
      </h1>
      <Suspense fallback={<LoadingIndicator />}>
        <AbstractInput value={abstract} onChange={setAbstract} />
        {objectives.map((obj, index) => (
          <ObjectiveInput
            key={index}
            value={obj}
            onChange={(value) => {
              const newObjectives = [...objectives]
              newObjectives[index] = value
              setObjectives(newObjectives)
            }}
            placeholder={`Objetivo ${index + 1}`}
          />
        ))}
      </Suspense>
      <Button
        onClick={handleCalculate}
        className='bg-light-primary text-light-onPrimary dark:bg-dark-primary dark:text-dark-onPrimary font-semibold'
        disabled={!isModelReady || isLoading}
      >
        {isLoading ? 'Calculando...' : 'Calcular Similitud'}
      </Button>
      {isLoading && <LoadingIndicator />}
      {results && <ResultsDisplay results={results} />}
    </main>
  )
}
