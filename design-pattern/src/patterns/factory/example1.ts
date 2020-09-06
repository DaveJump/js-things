/**
 * General
 */

enum PistolType {
  DesertHawk,
  P229
}

interface PistolShootable {
  aim(): Pistol
  shoot(): Pistol
}

abstract class Pistol implements PistolShootable {
  abstract aim(): Pistol
  abstract shoot(): Pistol
}

class DesertHawk extends Pistol {
  aim() {
    console.log('DesertHawk locked target')
    return this
  }
  shoot() {
    console.log('DesertHawk shooting...')
    return this
  }
}

class P229 extends Pistol {
  aim() {
    console.log('P229 locked target')
    return this
  }
  shoot() {
    console.log('P229 shooting...')
    return this
  }
}

class PistolFactory {
  static createPistol(type: PistolType): Pistol {
    switch (type) {
      case PistolType.DesertHawk:
        return new DesertHawk()
      case PistolType.P229:
        return new P229()
      default:
        throw new Error('Pistol is not supported')
    }
  }
}

const desertHawk = PistolFactory.createPistol(PistolType.DesertHawk)
desertHawk.aim().shoot()
