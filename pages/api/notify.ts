import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') return res.status(405).end()

    const { userAddress, swapFrom, swapInto } = req.body as {
      userAddress: string
      swapFrom: {
        name: string
        amount: number
      }
      swapInto: {
        name: string
        amount: number
      }
    }

    if (!swapFrom || !swapInto || !userAddress)
      return res.status(422).json({ error: 'Missing swap info' })

    // @TODO #2: Send receipt to user
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error in Notify API' })
  }
}
