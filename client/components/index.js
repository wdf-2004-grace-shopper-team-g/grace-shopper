/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as GuestHome} from './guest-home'
export {default as AllUsers} from './AllUsers'
export {default as SingleBeat} from './SingleBeat'
export {default as AllBeats} from './AllBeats'
export {default as About} from './About'
export {Login, Signup} from './auth-form'
export {default as UserProfile} from './user-profile'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout/checkout'
