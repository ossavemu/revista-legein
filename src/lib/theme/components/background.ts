import { backgroundSetter } from '../utils/background'

export class Background extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super()
  }

  public connectedCallback(): void {
    backgroundSetter()
  }
}
