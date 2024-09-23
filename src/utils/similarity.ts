import { pipeline, env } from '@xenova/transformers'

// Configuración opcional
env.useBrowserCache = false // Deshabilitar caché del navegador si es necesario
env.allowLocalModels = false // Deshabilitar modelos locales si no los usas

let model: any = null

export async function calculateSimilarity(
  abstract: string,
  objectives: string[]
): Promise<{
  individualPercentages: number[]
  overallPercentage: number
}> {
  if (!model) {
    model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }

  const sentences = [abstract, ...objectives]
  const embeddings = (await model(sentences, {
    pooling: 'mean',
    normalize: true
  })) as number[][]

  const abstractEmbedding = embeddings[0]
  const objectiveEmbeddings = embeddings.slice(1)

  const similarities = objectiveEmbeddings.map((objEmb) =>
    cosineSimilarity(abstractEmbedding, objEmb)
  )

  const percentages = similarities.map((sim) => sim * 100)
  const overallPercentage =
    percentages.reduce((a, b) => a + b, 0) / percentages.length

  return {
    individualPercentages: percentages,
    overallPercentage: overallPercentage
  }
}

function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0)
  const magnitude1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0))
  const magnitude2 = Math.sqrt(vec2.reduce((sum, a) => sum + a * a, 0))
  return dotProduct / (magnitude1 * magnitude2)
}

export function isModelLoaded(): boolean {
  return model !== null
}
