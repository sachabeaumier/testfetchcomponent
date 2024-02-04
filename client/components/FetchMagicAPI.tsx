import { useState, useEffect } from 'react'

const CardforeignName = ({ foreignName }) => (
  <li key={foreignName.multiverseid}>
    <p>ForeignName Name: {foreignName.name}</p>
    <p>ForeignName text: {foreignName.text}</p>
  </li>
)

function FetchMagicCards() {
  const [data, setData] = useState(null)
  const magicdata = 'https://api.magicthegathering.io/v1/cards'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(magicdata)
        const result = await response.json()
        console.log('API Response:', result)

        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>API Fetch For Magic Cards</h1>
      {data && data.cards && (
        <div>
          <ul>
            {data.cards.map((card: any, cardidx: any) => (
              <li key={cardidx}>
                <p>{card.name}</p>
                <p>{card.manaCost}</p>
                <p>{`CMC: ${card.cmc}`}</p>
                <p>{card.colors}</p>
                <ul>
                  {card.foreignNames &&
                    card.foreignNames.map((foreignName) => (
                      <li key={foreignName.multiverseid}>
                        <CardforeignName
                          key={foreignName.multiverseid}
                          foreignName={foreignName}
                        />
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FetchMagicCards
