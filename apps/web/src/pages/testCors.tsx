import React, { useEffect, useState } from 'react'

export default function TestComponent() {
  const [data, setData] = useState('')

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/test')
      .then((response) => response.text())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return <div>{data}</div>
}
