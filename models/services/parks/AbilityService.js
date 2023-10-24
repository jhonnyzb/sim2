import AbilityCreator from '~/utils/AbilityCreator'
import { Constants } from '~/components/parks/Constants'

export default class AbilityService extends AbilityCreator {
  constructor() {
    super(Constants.IDENTIFIER, Constants.Roles, Constants.Models)
  }
}
