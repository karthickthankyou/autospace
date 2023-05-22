import ReactMarkdown from 'react-markdown'
import styles from './markdown.module.css'

export interface IAboutPageCustomerProps {}

const markdownText = `
# Welcome to Autospace!

Autospace is a comprehensive portfolio project created by **Karthick Ragavendran**. It's currently in the "pitch stage", where investors can try out the whole application and validate the idea.



## The Concept

The concept of Autospace was born out of the constant struggle of finding a parking spot. The idea was simple: "There must be a better way!" So, Autospace was conceptualized, a platform that aims to connect garage owners with drivers in need of a parking spot.



## Our Features

Autospace is designed to offer a range of features:

- **Find a Garage**: Search for available garages near your location.
- **Book a Slot**: Once you find a garage, you can book a slot for your vehicle.
- **Valet Service**: Don't want to park yourself? No problem! Our valet service can do it for you.
- **Car Spa**: Want to pamper your car while you're away? Choose from our list of car spa services.
- **Different Pickup and Dropoff Locations**: Want to get your vehicle delivered somewhere else? You can choose different pickup and dropoff locations.

## Open Source

Autospace is an open-source project. It's a testament to the power of collaboration and the open-source community.

## Join Me

Remember, Autospace is not an actual product yet. But it's a very extensive application that's ready to be pitched to investors. I'm excited about the potential of Autospace and we hope you are too!
`

export const AboutPageCustomer = ({}: IAboutPageCustomerProps) => {
  return (
    <ReactMarkdown className={styles.markdown}>{markdownText}</ReactMarkdown>
  )
}
