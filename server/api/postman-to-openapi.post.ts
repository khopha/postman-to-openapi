import postmanToOpenApi from 'postman-to-openapi'

async function convert(collection: string) {
  try {
    const result = await postmanToOpenApi(collection, undefined, { defaultTag: 'General' })
    return result
  } catch (err) {
    throw err
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { collection } = await readBody(event)
    const collectionJson = JSON.parse(collection)
    const collectionStr = JSON.stringify(collectionJson)
    const result = await convert(collectionStr)
    return {
      data: result
    }
  } catch (err) {
    return { error: err }
  }
})
