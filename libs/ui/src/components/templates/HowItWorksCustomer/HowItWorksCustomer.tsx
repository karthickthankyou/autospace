import { RotatingCamera } from '@autospace-org/3d/src/scenes/CarScene'
import { ParkingSlotScene } from '@autospace-org/3d/src/scenes/ParkingSlotScene'
import { Container } from '../../atoms/Container'

export interface IHowItWorksCustomerProps {}

export const HowItWorksCustomer = ({}: IHowItWorksCustomerProps) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <ParkingSlotScene>
          <RotatingCamera maxFov={10} minFov={6} radius={45} />
        </ParkingSlotScene>
      </div>
      <Container>
        <div className="max-w-xl space-y-4 text-white">
          <div className="text-lg font-medium">How It Works</div>
          <div className="text-lg font-semibold">Welcome to AutoSpace!</div>
          <p>
            Are you tired of wasting precious time circling the city blocks like
            a predator stalking its prey, only instead of a delicious dinner,
            you're hunting for a tiny patch of asphalt to park your car? You're
            not alone, and that's exactly why AutoSpace exists. Let's walk you
            through how it works, step by step.
          </p>{' '}
          <div className="text-lg">Step 1: Unleash the Power of AutoSpace</div>
          <p>
            First, sign up and create your account. It's as easy as pie - a pie
            that you don't have to fight over a parking spot for. With just a
            few clicks, you'll be ready to roll, without worrying about where to
            leave your precious four-wheeled friend.
          </p>
          <div className="text-lg">Step 2: Destination? Known! </div>
          <p>
            Next, just type in your destination. Whether you're heading to the
            city center for some retail therapy, or to that new hipster café on
            the outskirts for a cup of artisanal, fair-trade, non-GMO,
            gluten-free, vegan coffee (or just a regular cup of Joe, we don't
            judge), AutoSpace has got you covered!
          </p>{' '}
          <div className="text-lg">Step 3: Choose your Spot</div>
          <p>
            AutoSpace will present you with a list of available parking spots
            near your destination. You can select based on distance, price, or
            even the likelihood of encountering a horde of wild shopping carts.
            Choose the spot that suits your needs, and voila! No more parking
            woes.
          </p>
          <div className="text-lg">Step 4: Park and Enjoy</div>
          <p>
            Now, all that's left to do is to drive to your reserved spot and
            park your car. No more circling, no more stalking, no more
            frustration. Just smooth, easy parking.
          </p>
          <div className="text-lg">Step 5: Walk Away Like a Boss</div>{' '}
          <p>
            Once your car is comfortably parked, you're free to walk away with
            swagger, knowing you've outsmarted the concrete jungle. Now you can
            enjoy your day, while your car enjoys its own little vacation spot.
            And there you have it! That's how AutoSpace transforms your parking
            nightmares into sweet, sweet dreams. So, why wait? Join the
            AutoSpace revolution today, and say goodbye to parking woes forever.
          </p>{' '}
          <p>Happy parking! </p>
          <br />
          <p>
            Remember, AutoSpace is not responsible for any increase in swagger,
            coolness, or overall happiness that may result from using our
            service. Proceed with caution and enjoy!
          </p>
        </div>
      </Container>
    </div>
  )
}
